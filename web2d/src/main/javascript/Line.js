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

web2d.Line = function(attributes)
{
    var peer = web2d.peer.Toolkit.createLine();
    var defaultAttributes = {strokeColor:'#495879',strokeWidth:1};
    for (var key in attributes)
    {
        defaultAttributes[key] = attributes[key];
    }
    web2d.Element.call(this, peer, defaultAttributes);
};
objects.extend(web2d.Line, web2d.Element);

web2d.Line.prototype.getType = function()
{
    return "Line";
};

web2d.Line.prototype.setFrom = function(x, y)
{
    this._peer.setFrom(x, y);
};

web2d.Line.prototype.setTo = function(x, y)
{
    this._peer.setTo(x, y);
};

web2d.Line.prototype.getFrom = function()
{
    return this._peer.getFrom();
};

web2d.Line.prototype.getTo = function()
{
    return this._peer.getTo();
};

/**
 * Defines the start and the end line arrow style.
 * Can have values "none | block | classic | diamond | oval | open | chevron | doublechevron"
 **/
web2d.Line.prototype.setArrowStyle = function(startStyle, endStyle)
{
    this._peer.setArrowStyle(startStyle, endStyle);
};

web2d.Line.prototype.setPosition = function(cx, cy)
{
    throw "Unsupported operation";
};

web2d.Line.prototype.setSize = function(width, height)
{
    throw "Unsupported operation";
};

web2d.Line.prototype.setFill = function(color, opacity)
{
    throw "Unsupported operation";
};
