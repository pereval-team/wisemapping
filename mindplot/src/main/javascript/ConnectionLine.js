/*
* Licensed to the Apache Software Foundation (ASF) under one or more
* contributor license agreements.  See the NOTICE file distributed with
* this work for additional information regarding copyright ownership.
* The ASF licenses this file to You under the Apache License, Version 2.0
* (the "License"); you may not use this file except in compliance with
* the License.  You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* $Id: file 64488 2006-03-10 17:32:09Z paulo $
*/

mindplot.ConnectionLine = function(sourceNode, targetNode, lineType)
{
    core.assert(targetNode, 'parentNode node can not be null');
    core.assert(sourceNode, 'childNode node can not be null');
    core.assert(sourceNode != targetNode, 'Cilcular connection');

    this._targetTopic = targetNode;
    this._sourceTopic = sourceNode;
    this._isRelationship=false;

    var strokeColor = mindplot.ConnectionLine.getStrokeColor();
    var line;
    if (targetNode.getType() == mindplot.NodeModel.CENTRAL_TOPIC_TYPE)
    {
        line = this._createLine(lineType,mindplot.ConnectionLine.SIMPLE);
//        line = new web2d.Line();
        line.setStroke(1, 'solid', strokeColor);
    } else
    {
        line = this._createLine(lineType,mindplot.ConnectionLine.POLYLINE);
//        line = new web2d.PolyLine();
        line.setStroke(1, 'solid', strokeColor);
    }

    this._line2d = line;
};

mindplot.ConnectionLine.prototype._createLine = function(lineType, defaultStyle){
    if(!core.Utils.isDefined(lineType)){
        lineType = defaultStyle;
    }
    lineType = parseInt(lineType);
    this._lineType = lineType;
    var line = null;
    switch(lineType){
        case mindplot.ConnectionLine.POLYLINE:
            line = new web2d.PolyLine();
            break;
        case mindplot.ConnectionLine.CURVED:
            line = new web2d.CurvedLine();
            break;
        case mindplot.ConnectionLine.SIMPLE_CURVED:
            line = new web2d.CurvedLine();
            line.setStyle(web2d.CurvedLine.SIMPLE_LINE);
            break;
        default:
            line = new web2d.Line();
            break;
    }
    return line;
}

mindplot.ConnectionLine.getStrokeColor = function()
{
    return '#495879';
};

mindplot.ConnectionLine.prototype.setVisibility = function(value)
{
    var line2d = this._line2d;
    line2d.setVisibility(value);
};

mindplot.ConnectionLine.prototype.redraw = function()
{
    var line2d = this._line2d;
    var sourceTopic = this._sourceTopic;
    var sourcePosition = sourceTopic.getPosition();

    var targetTopic = this._targetTopic;
    var targetPosition = targetTopic.getPosition();

    var sPos,tPos;
    if(this._isRelationship){
        this._line2d.setStroke(2);
        var ctrlPoints = this._line2d.getControlPoints();
        if(!core.Utils.isDefined(ctrlPoints[0].x) || !core.Utils.isDefined(ctrlPoints[1].x)){
            var defaultPoints = core.Utils.calculateDefaultControlPoints(sourceTopic.getPosition(), targetTopic.getPosition());
            ctrlPoints[0].x=defaultPoints[0].x;
            ctrlPoints[0].y=defaultPoints[0].y;
            ctrlPoints[1].x=defaultPoints[1].x;
            ctrlPoints[1].y=defaultPoints[1].y;
        }
        sPos = core.Utils.calculateRelationShipPointCoordinates(sourceTopic,ctrlPoints[0]);
        tPos = core.Utils.calculateRelationShipPointCoordinates(targetTopic,ctrlPoints[1]);
    }else{
        sPos = sourceTopic.workoutOutgoingConnectionPoint(targetPosition, false);
        tPos = targetTopic.workoutIncomingConnectionPoint(sourcePosition, false);
    }
    //    console.log("source:"+sPos.x+":"+sPos.y);

    line2d.setFrom(sPos.x, sPos.y);
//    console.log("target:"+tPos.x+":"+tPos.y);
    line2d.setTo(tPos.x, tPos.y);

    line2d.moveToBack();

    // Add connector ...
    this._positionateConnector(targetTopic);

};

mindplot.ConnectionLine.prototype._positionateConnector = function(targetTopic)
{
    var targetPosition = targetTopic.getPosition();
    var offset = mindplot.Topic.CONNECTOR_WIDTH / 2;
    var targetTopicSize = targetTopic.getSize();
    var y;
    if (targetTopic.getShapeType() == mindplot.NodeModel.SHAPE_TYPE_LINE)
    {
        y = targetTopicSize.height;
    } else
    {
        y = targetTopicSize.height / 2;
    }
    y = y - offset;

    var connector = targetTopic.getShrinkConnector();
    if (targetPosition.x >= 0)
    {
        var x = targetTopicSize.width;
        connector.setPosition(x, y);
    }
    else
    {
        var x = -mindplot.Topic.CONNECTOR_WIDTH;
        connector.setPosition(x, y);
    }
};

mindplot.ConnectionLine.prototype.setStroke = function(color, style, opacity)
{
    var line2d = this._line2d;
    this._line2d.setStroke(null, null, color, opacity);
};


mindplot.ConnectionLine.prototype.addToWorkspace = function(workspace)
{
    if(this._line2d.getType() == "CurvedLine"){
        this._line2d.addEventListener('click',function(event){
            var controlPoints = workspace.getLineControlPoints();
            controlPoints.setLine(this);
            controlPoints.setVisibility(true);
            event.stopPropagation();
        }.bind(this));
    }
    workspace.appendChild(this._line2d);
};

mindplot.ConnectionLine.prototype.removeFromWorkspace = function(workspace)
{
    workspace.removeChild(this._line2d);
};

mindplot.ConnectionLine.prototype.getTargetTopic = function()
{
    return this._targetTopic;
};

mindplot.ConnectionLine.prototype.getSourceTopic = function()
{
    return this._sourceTopic;
};

mindplot.ConnectionLine.prototype.getLineType = function(){
    return this._lineType;
};

mindplot.ConnectionLine.prototype.getLine = function(){
    return this._line2d;
};

mindplot.ConnectionLine.prototype.getModel = function(){
    return this._model;
};

mindplot.ConnectionLine.prototype.setModel = function(model){
    this._model = model;
};

mindplot.ConnectionLine.prototype.setIsRelationship = function(isRelationship){
    this._isRelationship=isRelationship;
};

mindplot.ConnectionLine.prototype.isRelationship = function(){
    return this._isRelationship;
};

mindplot.ConnectionLine.SIMPLE=0;
mindplot.ConnectionLine.POLYLINE=1;
mindplot.ConnectionLine.CURVED=2;
mindplot.ConnectionLine.SIMPLE_CURVED=3;