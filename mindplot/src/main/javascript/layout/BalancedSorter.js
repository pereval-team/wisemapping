/*
 *    Copyright [2011] [wisemapping]
 *
 *   Licensed under WiseMapping Public License, Version 1.0 (the "License").
 *   It is basically the Apache License, Version 2.0 (the "License") plus the
 *   "powered by wisemapping" text requirement on every single page;
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the license at
 *
 *       http://www.wisemapping.org/license
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
mindplot.layout.BalancedSorter = new Class({
    Extends: mindplot.layout.AbstractBasicSorter,

    initialize: function() {

    },

    predict : function(parent, graph, position) {
        var rootNode = graph.getRootNode(parent);

        if (!position) {
            var right = this._getChildrenForOrder(parent, graph, 0);
            var left = this._getChildrenForOrder(parent, graph, 1);
        }
        // Filter nodes on one side..
        var order = position ? (position.x > rootNode.getPosition().x ? 0 : 1) : ((right.length - left.length) > 0 ? 1 : 0);
        var direction = order%2 == 0 ? 1 : -1;
        var children = this._getChildrenForOrder(parent, graph, order);

        // No children?
        if (children.length == 0) {
            return [order, {x:parent.getPosition().x + direction * (parent.getSize().width + mindplot.layout.BalancedSorter.INTERNODE_HORIZONTAL_PADDING * 2), y:parent.getPosition().y}];
        }


        // Try to fit within ...
        var result = null;
        var last = children.getLast();
        position = position || {x: last.getPosition().x, y:last.getPosition().y + 1};
        children.each(function(child, index) {
            var cpos = child.getPosition();
            if (position.y > cpos.y) {
                yOffset = child == last ?
                    child.getSize().height + mindplot.layout.BalancedSorter.INTERNODE_VERTICAL_PADDING * 2 :
                    (children[index + 1].getPosition().y - child.getPosition().y) / 2;
                result = [child.getOrder() + 2,{x:cpos.x, y:cpos.y + yOffset}];
            }
        });

        // Position wasn't below any node, so it must be inserted above
        if (!result) {
            var first = children[0];
            result = [position.x > 0 ? 0 : 1, {
                x:first.getPosition().x,
                y:first.getPosition().y - first.getSize().height - mindplot.layout.BalancedSorter.INTERNODE_VERTICAL_PADDING * 2
            }];
        }

        return result;
    },

    insert: function(treeSet, parent, child, order) {
        var children = this._getChildrenForOrder(parent, treeSet, order);

        // Shift all the elements by two, so side is the same.
        // In case of balanced sorter, order don't need to be continuous...
        var max = 0;
        for (var i = 0; i < children.length; i++) {
            var node = children[i];
            max = Math.max(max, node.getOrder());
            if (node.getOrder() >= order) {
                max = Math.max(max, node.getOrder() + 2);
                node.setOrder(node.getOrder() + 2);
            }
        }

        var newOrder = order > (max + 1) ? (max + 2) : order;
        child.setOrder(newOrder);
    },

    detach:function(treeSet, node) {
        var parent = treeSet.getParent(node);
        // Filter nodes on one side..
        var children = this._getChildrenForOrder(parent, treeSet, node.getOrder());

        children.each(function(child, index) {
            if (child.getOrder() > node.getOrder()) {
                child.setOrder(child.getOrder() - 2);
            }
        });
        node.setOrder(node.getOrder() % 2 == 0 ? 0 : 1);
    },

    computeOffsets:function(treeSet, node) {
        $assert(treeSet, "treeSet can no be null.");
        $assert(node, "node can no be null.");

        var children = this._getSortedChildren(treeSet, node);

        // Compute heights ...
        var heights = children.map(
            function(child) {
                return {id:child.getId(), order:child.getOrder(), width: child.getSize().width, height:this._computeChildrenHeight(treeSet, child)};
            }, this).reverse();


        // Compute the center of the branch ...
        var totalPHeight = 0;
        var totalNHeight = 0;

        heights.forEach(function(elem) {
            if (elem.order % 2 == 0) {
                totalPHeight += elem.height;
            } else {
                totalNHeight += elem.height;
            }
        });
        var psum = totalPHeight / 2;
        var nsum = totalNHeight / 2;
        var ysum = 0;

        // Calculate the offsets ...
        var result = {};
        for (var i = 0; i < heights.length; i++) {
            var direction = heights[i].order % 2 ? -1 : 1;

            if (direction > 0) {
                psum = psum - heights[i].height;
                ysum = psum;
            } else {
                nsum = nsum - heights[i].height;
                ysum = nsum;
            }

            var yOffset = ysum + heights[i].height / 2;
            var xOffset = direction * (node.getSize().width / 2 + heights[i].width / 2 + + mindplot.layout.BalancedSorter.INTERNODE_HORIZONTAL_PADDING);

            $assert(!isNaN(xOffset), "xOffset can not be null");
            $assert(!isNaN(yOffset), "yOffset can not be null");

            result[heights[i].id] = {x:xOffset,y:yOffset};
        }
        return result;
    },

    _getChildrenForSide: function(parent, graph, position) {
        position = position || {x: parent.getPosition().x + 1, y:parent.getPosition().y + 1};
        var rootPosition = graph.getRootNode(parent).getPosition();
        return graph.getChildren(parent).filter(function(child) {
            return position.x > rootPosition.x ? child.getPosition().x > rootPosition.x : child.getPosition().x < rootPosition.x;
        });
    },

    _getChildrenForOrder: function(parent, graph, order) {
        return this._getSortedChildren(graph, parent).filter(function(node) {
            return node.getOrder() % 2 == order % 2;
        });
    },

    verify:function(treeSet, node) {
        // Check that all is consistent ...
        var children = this._getChildrenForOrder(node, treeSet, node.getOrder());

        // All odd ordered nodes should be "continuous" by themselves
        // All even numbered nodes should be "continuous" by themselves
        var factor = node.getOrder() % 2 == 0 ? 2 : 1;
        for (var i = 0; i < children.length; i++) {
            var order = i == 0 && factor == 1 ? 1 : (factor * i);
            $assert(children[i].getOrder() == order, "Missing order elements. Missing order: " + (i * factor));
        }
    },

    getDirection: function(treeSet, node) {
        return node.getOrder() % 2 == 0 ? 1 : -1;
    },

    toString:function() {
        return "Balanced Sorter";
    },

    _getVerticalPadding:function() {
        return mindplot.layout.BalancedSorter.INTERNODE_VERTICAL_PADDING;
    }

});

mindplot.layout.BalancedSorter.INTERNODE_VERTICAL_PADDING = 5;
mindplot.layout.BalancedSorter.INTERNODE_HORIZONTAL_PADDING = 30;
