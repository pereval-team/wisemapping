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

//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vJAXB 2.0 in JDK 1.6 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2007.04.14 at 05:27:07 PM ART 
//


package com.wisemapping.xml.svgmap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


/**
 * <p>Java class for anonymous complex type.
 * <p/>
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p/>
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;attribute name="fill" use="required" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="focusable" use="required" type="{http://www.w3.org/2001/XMLSchema}NMTOKEN" fixed="true" />
 *       &lt;attribute name="font-family" use="required" type="{http://www.w3.org/2001/XMLSchema}NMTOKEN" fixed="verdana" />
 *       &lt;attribute name="font-size" use="required" type="{http://www.w3.org/2001/XMLSchema}float" />
 *       &lt;attribute name="font-style" use="required">
 *         &lt;simpleType>
 *           &lt;restriction base="{http://www.w3.org/2001/XMLSchema}NMTOKEN">
 *             &lt;enumeration value="italic"/>
 *             &lt;enumeration value="normal"/>
 *           &lt;/restriction>
 *         &lt;/simpleType>
 *       &lt;/attribute>
 *       &lt;attribute name="font-weight" use="required">
 *         &lt;simpleType>
 *           &lt;restriction base="{http://www.w3.org/2001/XMLSchema}NMTOKEN">
 *             &lt;enumeration value="bold"/>
 *             &lt;enumeration value="normal"/>
 *           &lt;/restriction>
 *         &lt;/simpleType>
 *       &lt;/attribute>
 *       &lt;attribute name="style" use="required" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="x" use="required" type="{http://www.w3.org/2001/XMLSchema}float" />
 *       &lt;attribute name="y" use="required" type="{http://www.w3.org/2001/XMLSchema}float" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
        "content"
        })
@XmlRootElement(name = "text")
public class Text {

    @XmlValue
    protected String content;
    @XmlAttribute(required = true)
    protected String fill;
    @XmlAttribute(required = true)
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String focusable;
    @XmlAttribute(name = "font-family", required = true)
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String fontFamily;
    @XmlAttribute(name = "font-size", required = true)
    protected float fontSize;
    @XmlAttribute(name = "font-style", required = true)
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String fontStyle;
    @XmlAttribute(name = "font-weight", required = true)
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String fontWeight;
    @XmlAttribute(required = true)
    protected String style;
    @XmlAttribute(required = true)
    protected float x;
    @XmlAttribute(required = true)
    protected float y;

    /**
     * Gets the value of the content property.
     *
     * @return possible object is
     *         {@link String }
     */
    public String getContent() {
        return content;
    }

    /**
     * Sets the value of the content property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setContent(String value) {
        this.content = value;
    }

    /**
     * Gets the value of the fill property.
     *
     * @return possible object is
     *         {@link String }
     */
    public String getFill() {
        return fill;
    }

    /**
     * Sets the value of the fill property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setFill(String value) {
        this.fill = value;
    }

    /**
     * Gets the value of the focusable property.
     *
     * @return possible object is
     *         {@link String }
     */
    public String getFocusable() {
        if (focusable == null) {
            return "true";
        } else {
            return focusable;
        }
    }

    /**
     * Sets the value of the focusable property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setFocusable(String value) {
        this.focusable = value;
    }

    /**
     * Gets the value of the fontFamily property.
     *
     * @return possible object is
     *         {@link String }
     */
    public String getFontFamily() {
        if (fontFamily == null) {
            return "verdana";
        } else {
            return fontFamily;
        }
    }

    /**
     * Sets the value of the fontFamily property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setFontFamily(String value) {
        this.fontFamily = value;
    }

    /**
     * Gets the value of the fontSize property.
     */
    public float getFontSize() {
        return fontSize;
    }

    /**
     * Sets the value of the fontSize property.
     */
    public void setFontSize(float value) {
        this.fontSize = value;
    }

    /**
     * Gets the value of the fontStyle property.
     *
     * @return possible object is
     *         {@link String }
     */
    public String getFontStyle() {
        return fontStyle;
    }

    /**
     * Sets the value of the fontStyle property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setFontStyle(String value) {
        this.fontStyle = value;
    }

    /**
     * Gets the value of the fontWeight property.
     *
     * @return possible object is
     *         {@link String }
     */
    public String getFontWeight() {
        return fontWeight;
    }

    /**
     * Sets the value of the fontWeight property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setFontWeight(String value) {
        this.fontWeight = value;
    }

    /**
     * Gets the value of the style property.
     *
     * @return possible object is
     *         {@link String }
     */
    public String getStyle() {
        return style;
    }

    /**
     * Sets the value of the style property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setStyle(String value) {
        this.style = value;
    }

    /**
     * Gets the value of the x property.
     */
    public float getX() {
        return x;
    }

    /**
     * Sets the value of the x property.
     */
    public void setX(float value) {
        this.x = value;
    }

    /**
     * Gets the value of the y property.
     */
    public float getY() {
        return y;
    }

    /**
     * Sets the value of the y property.
     */
    public void setY(float value) {
        this.y = value;
    }

}