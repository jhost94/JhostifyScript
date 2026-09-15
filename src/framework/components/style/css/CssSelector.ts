import Css, { CssAttributeVariantType, CssOptions } from "./Css";
import Style from "../Style";
import CssHelper from "./CssHelper";



export default  class CssSelector {
    private identifier: string = '';

    constructor(private options: CssOptions = {isScss: false, isPage: false}) {

    }


    /**
     * Basic Selectors
     */

    public class(clazz: string): CssSelector {
        return this.reset(`${CssHelper.class(clazz)}`);
    }
    
    public element(element: string): CssSelector {
        return this.reset(`${CssHelper.element(element)}`);
    }
    
    public id(id: string): CssSelector {
        return this.reset(`${CssHelper.element(id)}`);
    }

    /**
     * 
     * @param selectors One or more selecteds to group. If empty will do nothing. it will update the identifier to add the selectors as group.
     * Example: current identifier ".some-class"
     * Given selectors: [ ".some-other-class", ".yet-another-class" ]
     * Result: ".some-class, .some-other-class, .yet-another-class"
     * @returns 
     */
    public group(selectors: string[]): CssSelector {
        if (selectors.length > 0) {
            this.identifier = `${this.identifier}, ${selectors.reduce((p, c) => `${p}, ${c}`)}`
        }
        return this;
    }

    public all(): CssSelector {
        if (this.options.isPage) {
            return this.reset("");
        }
        throw "This is not a page, cannot set css for all"
    }

    /**
     * Same as @method all
     */
    public universal(): CssSelector {
        return this.all();
    }

    public hover(): CssSelector {
        this.identifier = `${CssHelper.hover(this.identifier)}`;
        return this;
    }
    
    public active(): CssSelector {
        this.identifier = `${CssHelper.active(this.identifier)}`;
        return this;
    }
    
    public focus(): CssSelector {
        this.identifier = `${CssHelper.focus(this.identifier)}`;
        return this;
    }
    
    public visited(): CssSelector {
        this.identifier = `${CssHelper.visited(this.identifier)}`;
        return this;
    }
    
    public firstChild(): CssSelector {
        this.identifier = `${CssHelper.firstChild(this.identifier)}`;
        return this;
    }
    
    public lastChild(): CssSelector {
        this.identifier = `${CssHelper.lastChild(this.identifier)}`;
        return this;
    }
    
    public nthChild(number: number): CssSelector {
        this.identifier = `${CssHelper.nthChild(this.identifier, number)}`;
        return this;
    }
    
    public nthOfType(number: number): CssSelector {
        this.identifier = `${CssHelper.nthOfType(this.identifier, number)}`;
        return this;
    }
    
    public onlyChild(): CssSelector {
        this.identifier = `${CssHelper.onlyChild(this.identifier)}`;
        return this;
    }
    
    public not(selector: string): CssSelector {
        this.identifier = `${CssHelper.not(this.identifier, selector)}`;
        return this;
    }
    
    public is(selector: string): CssSelector {
        this.identifier = `${CssHelper.is(this.identifier, selector)}`;
        return this;
    }
    
    public where(selector: string): CssSelector {
        this.identifier = `${CssHelper.is(this.identifier, selector)}`;
        return this;
    }
    
    public has(selector: string): CssSelector {
        this.identifier = `${CssHelper.has(this.identifier, selector)}`;
        return this;
    }
    
    
    /**
     * Attribute Selectors
    - ex: 
    input[type="text"]
    div[data-id="123"]
    a[href^="https"]
    img[src$=".png"]
    
    Variants:
    [attr]
    [attr=value]
    [attr^=value] (starts with)
    [attr$=value] (ends with)
    [attr*=value] (contains)
    * @param element The element to point to, example a, div, span, input, img, etc
    * @param attribute The specific attribute, example src for img, type for input, etc
    * @param value The CSS value
    * @param attributeValue Attribute value, such as the source for the src, etc
    * @param variant Attribute Selectors can accept exact value, starts with, ends with and contains. By default is exact value
    */
   public attribute(element: string, attribute: string, value: string, attributeValue?: string, variant: CssAttributeVariantType = "DEFAULT", caseSensitive?: "case-sensitive" | "case-insensitive") {
       if (attributeValue) {
           const selector = caseSensitive ?
           `${CssHelper.element(element)}[${attribute}${this.attributeValue(variant)}"${attributeValue}" ${this.attributeCaseSensitivity(caseSensitive)}]`
           : `${CssHelper.element(element)}[${attribute}${this.attributeValue(variant)}"${attributeValue}"]`;
           this.reset(selector);
        } else {
            this.reset(`${CssHelper.element(element)}[${attribute}]`);
        }
        return this;
    }

    public before(): CssSelector {
        this.identifier = `${CssHelper.before(this.identifier)}`;
        return this;
    }
    
    public after(): CssSelector {
        this.identifier = `${CssHelper.after(this.identifier)}`;
        return this;
    }
    
    public placeholder(): CssSelector {
        this.identifier = `${CssHelper.placeholder(this.identifier)}`;
        return this;
    }
    
    public marker(): CssSelector {
        this.identifier = `${CssHelper.marker(this.identifier)}`;
        return this;
    }
    
    public selection(): CssSelector {
        this.identifier = `${CssHelper.selection(this.identifier)}`;
        return this;
    }
    
    public html(): CssSelector {
        return this.reset("html");
    }
    
    public body(): CssSelector {
        return this.reset("body");
    }
    
    public root(): CssSelector {
        return this.reset(":root");
    }

    public decendent(decendent: string): CssSelector {
        this.identifier = `${CssHelper.decendent(this.identifier, decendent)}`;
        return this;
    }

    public combined(child: string): CssSelector {
        this.identifier = `${CssHelper.combined(this.identifier, child)}`;
        return this;
    }
    
    public style(style: Style): {selector: string, value: string} {
        return {
            selector: this.identifier,
            value: this.parseStyle(style)
        }
    }

    /**
     * Attention, this RESETS the identifier!
     * @param selector The selector to reset the identifier to.
     * @returns The current class
     */
    private reset(selector: string): CssSelector {
        this.identifier = selector;
        return this;
    }

    private attributeValue(variant: CssAttributeVariantType): string {
        switch (variant) {
            case 'CONTAINS':
                return "*=";
            case 'ENDS_WITH':
                return "$=";
            case 'STARTS_WITH':
                return "^";
            default:
                return "=";
        }
    }

    private attributeCaseSensitivity(caseSensitive: "case-sensitive" | "case-insensitive"): string {
        switch (caseSensitive) {
            case 'case-sensitive':
                return "s";
            case 'case-insensitive':
                return "i";
        }
    }

    private parseStyle(style: Style): string {
        let value = "";
        
        if (style.accent_color) value = this.setValue(value, `accent-color: ${style.accent_color};`);
        if (style.align_content) value = this.setValue(value, `align-content: ${style.align_content};`);
        if (style.align_items) value = this.setValue(value, `align-items: ${style.align_items};`);
        if (style.align_self) value = this.setValue(value, `align-self: ${style.align_self};`);
        if (style.all) value = this.setValue(value, `all: ${style.all};`);
        if (style.animation) value = this.setValue(value, `animation: ${style.animation};`);
        if (style.animation_delay) value = this.setValue(value, `animation-delay: ${style.animation_delay};`);
        if (style.animation_direction) value = this.setValue(value, `animation-direction: ${style.animation_direction};`);
        if (style.animation_duration) value = this.setValue(value, `animation-duration: ${style.animation_duration};`);
        if (style.animation_fill_mode) value = this.setValue(value, `animation-fill-mode: ${style.animation_fill_mode};`);
        if (style.animation_iteration_count) value = this.setValue(value, `animation-iteration-count: ${style.animation_iteration_count};`);
        if (style.animation_name) value = this.setValue(value, `animation-name: ${style.animation_name};`);
        if (style.animation_play_state) value = this.setValue(value, `animation-play-state: ${style.animation_play_state};`);
        if (style.animation_timing_function) value = this.setValue(value, `animation-timing-function: ${style.animation_timing_function};`);
        if (style.aspect_ratio) value = this.setValue(value, `aspect-ratio: ${style.aspect_ratio};`);

        if (style.backdrop_filter) value = this.setValue(value, `backdrop-filter: ${style.backdrop_filter};`);
        if (style.backface_visibility) value = this.setValue(value, `backface-visibility: ${style.backface_visibility};`);
        if (style.background) value = this.setValue(value, `background: ${style.background};`);
        if (style.background_attachment) value = this.setValue(value, `background-attachment: ${style.background_attachment};`);
        if (style.background_blend_mode) value = this.setValue(value, `background-blend-mode: ${style.background_blend_mode};`);
        if (style.background_clip) value = this.setValue(value, `background-clip: ${style.background_clip};`);
        if (style.background_color) value = this.setValue(value, `background-color: ${style.background_color};`);
        if (style.background_image) value = this.setValue(value, `background-image: ${style.background_image};`);
        if (style.background_origin) value = this.setValue(value, `background-origin: ${style.background_origin};`);
        if (style.background_position) value = this.setValue(value, `background-position: ${style.background_position};`);
        if (style.background_position_x) value = this.setValue(value, `background-position-x: ${style.background_position_x};`);
        if (style.background_position_y) value = this.setValue(value, `background-position-y: ${style.background_position_y};`);
        if (style.background_repeat) value = this.setValue(value, `background-repeat: ${style.background_repeat};`);
        if (style.background_size) value = this.setValue(value, `background-size: ${style.background_size};`);
        if (style.block_size) value = this.setValue(value, `block-size: ${style.block_size};`);
        if (style.border) value = this.setValue(value, `border: ${style.border};`);
        if (style.border_block) value = this.setValue(value, `border-block: ${style.border_block};`);
        if (style.border_block_color) value = this.setValue(value, `border-block-color: ${style.border_block_color};`);
        if (style.border_block_end) value = this.setValue(value, `border-block-end: ${style.border_block_end};`);
        if (style.border_block_end_color) value = this.setValue(value, `border-block-end-color: ${style.border_block_end_color};`);
        if (style.border_block_end_style) value = this.setValue(value, `border-block-end-style: ${style.border_block_end_style};`);
        if (style.border_block_end_width) value = this.setValue(value, `border-block-end-width: ${style.border_block_end_width};`);
        if (style.border_block_start) value = this.setValue(value, `border-block-start: ${style.border_block_start};`);
        if (style.border_block_start_color) value = this.setValue(value, `border-block-start-color: ${style.border_block_start_color};`);
        if (style.border_block_start_style) value = this.setValue(value, `border-block-start-style: ${style.border_block_start_style};`);
        if (style.border_block_start_width) value = this.setValue(value, `border-block-start-width: ${style.border_block_start_width};`);
        if (style.border_block_style) value = this.setValue(value, `border-block-style: ${style.border_block_style};`);
        if (style.border_block_width) value = this.setValue(value, `border-block-width: ${style.border_block_width};`);
        if (style.border_bottom) value = this.setValue(value, `border-bottom: ${style.border_bottom};`);
        if (style.border_bottom_color) value = this.setValue(value, `border-bottom-color: ${style.border_bottom_color};`);
        if (style.border_bottom_left_radius) value = this.setValue(value, `border-bottom-left-radius: ${style.border_bottom_left_radius};`);
        if (style.border_bottom_right_radius) value = this.setValue(value, `border-bottom-right-radius: ${style.border_bottom_right_radius};`);
        if (style.border_bottom_style) value = this.setValue(value, `border-bottom-style: ${style.border_bottom_style};`);
        if (style.border_bottom_width) value = this.setValue(value, `border-bottom-width: ${style.border_bottom_width};`);
        if (style.border_collapse) value = this.setValue(value, `border-collapse: ${style.border_collapse};`);
        if (style.border_color) value = this.setValue(value, `border-color: ${style.border_color};`);
        if (style.border_end_end_radius) value = this.setValue(value, `border-end-end-radius: ${style.border_end_end_radius};`);
        if (style.border_end_start_radius) value = this.setValue(value, `border-end-start-radius: ${style.border_end_start_radius};`);
        if (style.border_image) value = this.setValue(value, `border-image: ${style.border_image};`);
        if (style.border_image_outset) value = this.setValue(value, `border-image-outset: ${style.border_image_outset};`);
        if (style.border_image_repeat) value = this.setValue(value, `border-image-repeat: ${style.border_image_repeat};`);
        if (style.border_image_slice) value = this.setValue(value, `border-image-slice: ${style.border_image_slice};`);
        if (style.border_image_source) value = this.setValue(value, `border-image-source: ${style.border_image_source};`);
        if (style.border_image_width) value = this.setValue(value, `border-image-width: ${style.border_image_width};`);
        if (style.border_inline) value = this.setValue(value, `border-inline: ${style.border_inline};`);
        if (style.border_inline_color) value = this.setValue(value, `border-inline-color: ${style.border_inline_color};`);
        if (style.border_inline_end) value = this.setValue(value, `border-inline-end: ${style.border_inline_end};`);
        if (style.border_inline_end_color) value = this.setValue(value, `border-inline-end-color: ${style.border_inline_end_color};`);
        if (style.border_inline_end_style) value = this.setValue(value, `border-inline-end-style: ${style.border_inline_end_style};`);
        if (style.border_inline_end_width) value = this.setValue(value, `border-inline-end-width: ${style.border_inline_end_width};`);
        if (style.border_inline_start) value = this.setValue(value, `border-inline-start: ${style.border_inline_start};`);
        if (style.border_inline_start_color) value = this.setValue(value, `border-inline-start-color: ${style.border_inline_start_color};`);
        if (style.border_inline_start_style) value = this.setValue(value, `border-inline-start-style: ${style.border_inline_start_style};`);
        if (style.border_inline_start_width) value = this.setValue(value, `border-inline-start-width: ${style.border_inline_start_width};`);
        if (style.border_inline_style) value = this.setValue(value, `border-inline-style: ${style.border_inline_style};`);
        if (style.border_inline_width) value = this.setValue(value, `border-inline-width: ${style.border_inline_width};`);
        if (style.border_left) value = this.setValue(value, `border-left: ${style.border_left};`);
        if (style.border_left_color) value = this.setValue(value, `border-left-color: ${style.border_left_color};`);
        if (style.border_left_style) value = this.setValue(value, `border-left-style: ${style.border_left_style};`);
        if (style.border_left_width) value = this.setValue(value, `border-left-width: ${style.border_left_width};`);
        if (style.border_radius) value = this.setValue(value, `border-radius: ${style.border_radius};`);
        if (style.border_right) value = this.setValue(value, `border-right: ${style.border_right};`);
        if (style.border_right_color) value = this.setValue(value, `border-right-color: ${style.border_right_color};`);
        if (style.border_right_style) value = this.setValue(value, `border-right-style: ${style.border_right_style};`);
        if (style.border_right_width) value = this.setValue(value, `border-right-width: ${style.border_right_width};`);
        if (style.border_spacing) value = this.setValue(value, `border-spacing: ${style.border_spacing};`);
        if (style.border_start_end_radius) value = this.setValue(value, `border-start-end-radius: ${style.border_start_end_radius};`);
        if (style.border_start_start_radius) value = this.setValue(value, `border-start-start-radius: ${style.border_start_start_radius};`);
        if (style.border_style) value = this.setValue(value, `border-style: ${style.border_style};`);
        if (style.border_top) value = this.setValue(value, `border-top: ${style.border_top};`);
        if (style.border_top_color) value = this.setValue(value, `border-top-color: ${style.border_top_color};`);
        if (style.border_top_left_radius) value = this.setValue(value, `border-top-left-radius: ${style.border_top_left_radius};`);
        if (style.border_top_right_radius) value = this.setValue(value, `border-top-right-radius: ${style.border_top_right_radius};`);
        if (style.border_top_style) value = this.setValue(value, `border-top-style: ${style.border_top_style};`);
        if (style.border_top_width) value = this.setValue(value, `border-top-width: ${style.border_top_width};`);
        if (style.border_width) value = this.setValue(value, `border-width: ${style.border_width};`);
        if (style.bottom) value = this.setValue(value, `bottom: ${style.bottom};`);
        if (style.box_decoration_break) value = this.setValue(value, `box-decoration-break: ${style.box_decoration_break};`);
        if (style.box_reflect) value = this.setValue(value, `box-reflect: ${style.box_reflect};`);
        if (style.box_shadow) value = this.setValue(value, `box-shadow: ${style.box_shadow};`);
        if (style.box_sizing) value = this.setValue(value, `box-sizing: ${style.box_sizing};`);
        if (style.break_after) value = this.setValue(value, `break-after: ${style.break_after};`);
        if (style.break_before) value = this.setValue(value, `break-before: ${style.break_before};`);
        if (style.break_inside) value = this.setValue(value, `break-inside: ${style.break_inside};`);


        if (style.caption_side) value = this.setValue(value, `caption-side: ${style.caption_side};`);
        if (style.caret_color) value = this.setValue(value, `caret-color: ${style.caret_color};`);
        if (style._charset) value = this.setValue(value, `@charset: ${style._charset};`);
        if (style.clear) value = this.setValue(value, `clear: ${style.clear};`);
        if (style.clip) value = this.setValue(value, `clip: ${style.clip};`);
        if (style.clip_path) value = this.setValue(value, `clip-path: ${style.clip_path};`);
        if (style.color) value = this.setValue(value, `color: ${style.color};`);
        if (style.color_scheme) value = this.setValue(value, `color-scheme: ${style.color_scheme};`);
        if (style.column_count) value = this.setValue(value, `column-count: ${style.column_count};`);
        if (style.column_fill) value = this.setValue(value, `column-fill: ${style.column_fill};`);
        if (style.column_gap) value = this.setValue(value, `column-gap: ${style.column_gap};`);
        if (style.column_rule) value = this.setValue(value, `column-rule: ${style.column_rule};`);
        if (style.column_rule_color) value = this.setValue(value, `column-rule-color: ${style.column_rule_color};`);
        if (style.column_rule_style) value = this.setValue(value, `column-rule-style: ${style.column_rule_style};`);
        if (style.column_rule_width) value = this.setValue(value, `column-rule-width: ${style.column_rule_width};`);
        if (style.column_span) value = this.setValue(value, `column-span: ${style.column_span};`);
        if (style.column_width) value = this.setValue(value, `column-width: ${style.column_width};`);
        if (style.columns) value = this.setValue(value, `columns: ${style.columns};`);
        if (style._container) value = this.setValue(value, `@container: ${style._container};`);
        if (style.content) value = this.setValue(value, `content: ${style.content};`);
        if (style.counter_increment) value = this.setValue(value, `counter-increment: ${style.counter_increment};`);
        if (style.counter_reset) value = this.setValue(value, `counter-reset: ${style.counter_reset};`);
        if (style.counter_set) value = this.setValue(value, `counter-set: ${style.counter_set};`);
        if (style._counter_style) value = this.setValue(value, `@counter-style: ${style._counter_style};`);
        if (style.cursor) value = this.setValue(value, `cursor: ${style.cursor};`);

        if (style.direction) value = this.setValue(value, `direction: ${style.direction};`);
        if (style.display) value = this.setValue(value, `display: ${style.display};`);

        if (style.empty_cells) value = this.setValue(value, `empty-cells: ${style.empty_cells};`);

        if (style.filter) value = this.setValue(value, `filter: ${style.filter};`);
        if (style.flex) value = this.setValue(value, `flex: ${style.flex};`);
        if (style.flex_basis) value = this.setValue(value, `flex-basis: ${style.flex_basis};`);
        if (style.flex_direction) value = this.setValue(value, `flex-direction: ${style.flex_direction};`);
        if (style.flex_flow) value = this.setValue(value, `flex-flow: ${style.flex_flow};`);
        if (style.flex_grow) value = this.setValue(value, `flex-grow: ${style.flex_grow};`);
        if (style.flex_shrink) value = this.setValue(value, `flex-shrink: ${style.flex_shrink};`);
        if (style.flex_wrap) value = this.setValue(value, `flex-wrap: ${style.flex_wrap};`);
        if (style.float) value = this.setValue(value, `float: ${style.float};`);
        if (style.font) value = this.setValue(value, `font: ${style.font};`);
        if (style._font_face) value = this.setValue(value, `@font-face: ${style._font_face};`);
        if (style.font_family) value = this.setValue(value, `font-family: ${style.font_family};`);
        if (style.font_feature_settings) value = this.setValue(value, `font-feature-settings: ${style.font_feature_settings};`);
        if (style.font_kerning) value = this.setValue(value, `font-kerning: ${style.font_kerning};`);
        if (style.font_language_override) value = this.setValue(value, `font-language-override: ${style.font_language_override};`);
        if (style._font_palette_values) value = this.setValue(value, `@font-palette_values: ${style._font_palette_values};`);
        if (style.font_size) value = this.setValue(value, `font-size: ${style.font_size};`);
        if (style.font_size_adjust) value = this.setValue(value, `font-size-adjust: ${style.font_size_adjust};`);
        if (style.font_stretch) value = this.setValue(value, `font-stretch: ${style.font_stretch};`);
        if (style.font_style) value = this.setValue(value, `font-style: ${style.font_style};`);
        if (style.font_synthesis) value = this.setValue(value, `font-synthesis: ${style.font_synthesis};`);
        if (style.font_variant) value = this.setValue(value, `font-variant: ${style.font_variant};`);
        if (style.font_variant_alternates) value = this.setValue(value, `font-variant-alternates: ${style.font_variant_alternates};`);
        if (style.font_variant_caps) value = this.setValue(value, `font-variant-caps: ${style.font_variant_caps};`);
        if (style.font_variant_east_asian) value = this.setValue(value, `font-variant-east-asian: ${style.font_variant_east_asian};`);
        if (style.font_variant_ligatures) value = this.setValue(value, `font-variant-ligatures: ${style.font_variant_ligatures};`);
        if (style.font_variant_numeric) value = this.setValue(value, `font-variant-numeric: ${style.font_variant_numeric};`);
        if (style.font_variant_position) value = this.setValue(value, `font-variant-position: ${style.font_variant_position};`);
        if (style.font_weight) value = this.setValue(value, `font-weight: ${style.font_weight};`);

        if (style.gap) value = this.setValue(value, `gap: ${style.gap};`);
        if (style.grid) value = this.setValue(value, `grid: ${style.grid};`);
        if (style.grid_area) value = this.setValue(value, `grid-area: ${style.grid_area};`);
        if (style.grid_auto_columns) value = this.setValue(value, `grid-auto-columns: ${style.grid_auto_columns};`);
        if (style.grid_auto_flow) value = this.setValue(value, `grid-auto-flow: ${style.grid_auto_flow};`);
        if (style.grid_auto_rows) value = this.setValue(value, `grid-auto-rows: ${style.grid_auto_rows};`);
        if (style.grid_column) value = this.setValue(value, `grid-column: ${style.grid_column};`);
        if (style.grid_column_end) value = this.setValue(value, `grid-column-end: ${style.grid_column_end};`);
        if (style.grid_column_start) value = this.setValue(value, `grid-column-start: ${style.grid_column_start};`);
        if (style.grid_row) value = this.setValue(value, `grid-row: ${style.grid_row};`);
        if (style.grid_row_end) value = this.setValue(value, `grid-row-end: ${style.grid_row_end};`);
        if (style.grid_row_start) value = this.setValue(value, `grid-row-start: ${style.grid_row_start};`);
        if (style.grid_template) value = this.setValue(value, `grid-template: ${style.grid_template};`);
        if (style.grid_template_areas) value = this.setValue(value, `grid-template-areas: ${style.grid_template_areas};`);
        if (style.grid_template_columns) value = this.setValue(value, `grid-template-columns: ${style.grid_template_columns};`);
        if (style.grid_template_rows) value = this.setValue(value, `grid-template-rows: ${style.grid_template_rows};`);

        if (style.hanging_punctuation) value = this.setValue(value, `hanging-punctuation: ${style.hanging_punctuation};`);
        if (style.height) value = this.setValue(value, `height: ${style.height};`);
        if (style.hyphens) value = this.setValue(value, `hyphens: ${style.hyphens};`);
        if (style.hyphenate_character) value = this.setValue(value, `hyphenate-character: ${style.hyphenate_character};`);

        if (style.image_rendering) value = this.setValue(value, `image-rendering: ${style.image_rendering};`);
        if (style._import) value = this.setValue(value, `@import: ${style._import};`);
        if (style.initial_letter) value = this.setValue(value, `initial-letter: ${style.initial_letter};`);
        if (style.inline_size) value = this.setValue(value, `inline-size: ${style.inline_size};`);
        if (style.inset) value = this.setValue(value, `inset: ${style.inset};`);
        if (style.inset_block) value = this.setValue(value, `inset-block: ${style.inset_block};`);
        if (style.inset_block_end) value = this.setValue(value, `inset-block-end: ${style.inset_block_end};`);
        if (style.inset_block_start) value = this.setValue(value, `inset-block-start: ${style.inset_block_start};`);
        if (style.inset_inline) value = this.setValue(value, `inset-inline: ${style.inset_inline};`);
        if (style.inset_inline_end) value = this.setValue(value, `inset-inline-end: ${style.inset_inline_end};`);
        if (style.inset_inline_start) value = this.setValue(value, `inset-inline-start: ${style.inset_inline_start};`);
        if (style.isolation) value = this.setValue(value, `isolation: ${style.isolation};`);

        if (style.justify_content) value = this.setValue(value, `justify-content: ${style.justify_content};`);
        if (style.justify_items) value = this.setValue(value, `justify-items: ${style.justify_items};`);
        if (style.justify_self) value = this.setValue(value, `justify-self: ${style.justify_self};`);

        if (style._keyframes) value = this.setValue(value, `@keyframes: ${style._keyframes};`);

        if (style._layer) value = this.setValue(value, `@layer: ${style._layer};`);
        if (style.left) value = this.setValue(value, `left: ${style.left};`);
        if (style.letter_spacing) value = this.setValue(value, `letter-spacing: ${style.letter_spacing};`);
        if (style.line_break) value = this.setValue(value, `line-break: ${style.line_break};`);
        if (style.line_height) value = this.setValue(value, `line-height: ${style.line_height};`);
        if (style.list_style) value = this.setValue(value, `list-style: ${style.list_style};`);
        if (style.list_style_image) value = this.setValue(value, `list-style-image: ${style.list_style_image};`);
        if (style.list_style_position) value = this.setValue(value, `list-style-position: ${style.list_style_position};`);
        if (style.list_style_type) value = this.setValue(value, `list-style-type: ${style.list_style_type};`);

        if (style.margin) value = this.setValue(value, `margin: ${style.margin};`);
        if (style.margin_block) value = this.setValue(value, `margin-block: ${style.margin_block};`);
        if (style.margin_block_end) value = this.setValue(value, `margin-block-end: ${style.margin_block_end};`);
        if (style.margin_block_start) value = this.setValue(value, `margin-block-start: ${style.margin_block_start};`);
        if (style.margin_bottom) value = this.setValue(value, `margin-bottom: ${style.margin_bottom};`);
        if (style.margin_inline) value = this.setValue(value, `margin-inline: ${style.margin_inline};`);
        if (style.margin_inline_end) value = this.setValue(value, `margin-inline-end: ${style.margin_inline_end};`);
        if (style.margin_inline_start) value = this.setValue(value, `margin-inline-start: ${style.margin_inline_start};`);
        if (style.margin_left) value = this.setValue(value, `margin-left: ${style.margin_left};`);
        if (style.margin_right) value = this.setValue(value, `margin-right: ${style.margin_right};`);
        if (style.margin_top) value = this.setValue(value, `margin-top: ${style.margin_top};`);
        if (style.marker) value = this.setValue(value, `marker: ${style.marker};`);
        if (style.marker_end) value = this.setValue(value, `marker-end: ${style.marker_end};`);
        if (style.marker_mid) value = this.setValue(value, `marker-mid: ${style.marker_mid};`);
        if (style.marker_start) value = this.setValue(value, `marker-start: ${style.marker_start};`);
        if (style.mask) value = this.setValue(value, `mask: ${style.mask};`);
        if (style.mask_clip) value = this.setValue(value, `mask-clip: ${style.mask_clip};`);
        if (style.mask_composite) value = this.setValue(value, `mask-composite: ${style.mask_composite};`);
        if (style.mask_image) value = this.setValue(value, `mask-image: ${style.mask_image};`);
        if (style.mask_mode) value = this.setValue(value, `mask-mode: ${style.mask_mode};`);
        if (style.mask_origin) value = this.setValue(value, `mask-origin: ${style.mask_origin};`);
        if (style.mask_position) value = this.setValue(value, `mask-position: ${style.mask_position};`);
        if (style.mask_repeat) value = this.setValue(value, `mask-repeat: ${style.mask_repeat};`);
        if (style.mask_size) value = this.setValue(value, `mask-size: ${style.mask_size};`);
        if (style.mask_type) value = this.setValue(value, `mask-type: ${style.mask_type};`);
        if (style.max_height) value = this.setValue(value, `max-height: ${style.max_height};`);
        if (style.max_width) value = this.setValue(value, `max-width: ${style.max_width};`);
        if (style._media) value = this.setValue(value, `@media: ${style._media};`);
        if (style.max_block_size) value = this.setValue(value, `max-block-size: ${style.max_block_size};`);
        if (style.max_inline_size) value = this.setValue(value, `max-inline-size: ${style.max_inline_size};`);
        if (style.min_block_size) value = this.setValue(value, `min-block-size: ${style.min_block_size};`);
        if (style.min_inline_size) value = this.setValue(value, `min-inline-size: ${style.min_inline_size};`);
        if (style.min_height) value = this.setValue(value, `min-height: ${style.min_height};`);
        if (style.min_width) value = this.setValue(value, `min-width: ${style.min_width};`);
        if (style.mix_blend_mode) value = this.setValue(value, `mix-blend-mode: ${style.mix_blend_mode};`);

        if (style._namespace) value = this.setValue(value, `@namespace: ${style._namespace};`);

        if (style.object_fit) value = this.setValue(value, `object-fit: ${style.object_fit};`);
        if (style.object_position) value = this.setValue(value, `object-position: ${style.object_position};`);
        if (style.offset) value = this.setValue(value, `offset: ${style.offset};`);
        if (style.offset_anchor) value = this.setValue(value, `offset-anchor: ${style.offset_anchor};`);
        if (style.offset_distance) value = this.setValue(value, `offset-distance: ${style.offset_distance};`);
        if (style.offset_path) value = this.setValue(value, `offset-path: ${style.offset_path};`);
        if (style.offset_position) value = this.setValue(value, `offset-position: ${style.offset_position};`);
        if (style.offset_rotate) value = this.setValue(value, `offset-rotate: ${style.offset_rotate};`);
        if (style.opacity) value = this.setValue(value, `opacity: ${style.opacity};`);
        if (style.order) value = this.setValue(value, `order: ${style.order};`);
        if (style.orphans) value = this.setValue(value, `orphans: ${style.orphans};`);
        if (style.outline) value = this.setValue(value, `outline: ${style.outline};`);
        if (style.outline_color) value = this.setValue(value, `outline-color: ${style.outline_color};`);
        if (style.outline_offset) value = this.setValue(value, `outline-offset: ${style.outline_offset};`);
        if (style.outline_style) value = this.setValue(value, `outline-style: ${style.outline_style};`);
        if (style.outline_width) value = this.setValue(value, `outline-width: ${style.outline_width};`);
        if (style.overflow) value = this.setValue(value, `overflow: ${style.overflow};`);
        if (style.overflow_anchor) value = this.setValue(value, `overflow-anchor: ${style.overflow_anchor};`);
        if (style.overflow_wrap) value = this.setValue(value, `overflow-wrap: ${style.overflow_wrap};`);
        if (style.overflow_x) value = this.setValue(value, `overflow-x: ${style.overflow_x};`);
        if (style.overflow_y) value = this.setValue(value, `overflow-y: ${style.overflow_y};`);
        if (style.overscroll_behavior) value = this.setValue(value, `overscroll-behavior: ${style.overscroll_behavior};`);
        if (style.overscroll_behavior_block) value = this.setValue(value, `overscroll-behavior-block: ${style.overscroll_behavior_block};`);
        if (style.overscroll_behavior_inline) value = this.setValue(value, `overscroll-behavior-inline: ${style.overscroll_behavior_inline};`);
        if (style.overscroll_behavior_x) value = this.setValue(value, `overscroll-behavior-x: ${style.overscroll_behavior_x};`);
        if (style.overscroll_behavior_y) value = this.setValue(value, `overscroll-behavior-y: ${style.overscroll_behavior_y};`);

        if (style.padding) value = this.setValue(value, `padding: ${style.padding};`);
        if (style.padding_block) value = this.setValue(value, `padding-block: ${style.padding_block};`);
        if (style.padding_block_end) value = this.setValue(value, `padding-block-end: ${style.padding_block_end};`);
        if (style.padding_block_start) value = this.setValue(value, `padding-block-start: ${style.padding_block_start};`);
        if (style.padding_bottom) value = this.setValue(value, `padding-bottom: ${style.padding_bottom};`);
        if (style.padding_inline) value = this.setValue(value, `padding-inline: ${style.padding_inline};`);
        if (style.padding_inline_end) value = this.setValue(value, `padding-inline-end: ${style.padding_inline_end};`);
        if (style.padding_inline_start) value = this.setValue(value, `padding-inline-start: ${style.padding_inline_start};`);
        if (style.padding_left) value = this.setValue(value, `padding-left: ${style.padding_left};`);
        if (style.padding_right) value = this.setValue(value, `padding-right: ${style.padding_right};`);
        if (style.padding_top) value = this.setValue(value, `padding-top: ${style.padding_top};`);
        if (style._page) value = this.setValue(value, `@page: ${style._page};`);
        if (style.page_break_after) value = this.setValue(value, `page-break-after: ${style.page_break_after};`);
        if (style.page_break_before) value = this.setValue(value, `page-break-before: ${style.page_break_before};`);
        if (style.page_break_inside) value = this.setValue(value, `page-break-inside: ${style.page_break_inside};`);
        if (style.paint_order) value = this.setValue(value, `paint-order: ${style.paint_order};`);
        if (style.perspective) value = this.setValue(value, `perspective: ${style.perspective};`);
        if (style.perspective_origin) value = this.setValue(value, `perspective-origin: ${style.perspective_origin};`);
        if (style.place_content) value = this.setValue(value, `place-content: ${style.place_content};`);
        if (style.place_items) value = this.setValue(value, `place-items: ${style.place_items};`);
        if (style.place_self) value = this.setValue(value, `place-self: ${style.place_self};`);
        if (style.pointer_events) value = this.setValue(value, `pointer-events: ${style.pointer_events};`);
        if (style.position) value = this.setValue(value, `position: ${style.position};`);
        if (style._property) value = this.setValue(value, `@property: ${style._property};`);

        if (style.quotes) value = this.setValue(value, `quotes: ${style.quotes};`);

        if (style.resize) value = this.setValue(value, `resize: ${style.resize};`);
        if (style.right) value = this.setValue(value, `right: ${style.right};`);
        if (style.rotate) value = this.setValue(value, `rotate: ${style.rotate};`);
        if (style.row_gap) value = this.setValue(value, `row-gap: ${style.row_gap};`);

        if (style.scale) value = this.setValue(value, `scale: ${style.scale};`);
        if (style._scope) value = this.setValue(value, `@scope: ${style._scope};`);
        if (style.scroll_behavior) value = this.setValue(value, `scroll-behavior: ${style.scroll_behavior};`);
        if (style.scroll_margin) value = this.setValue(value, `scroll-margin: ${style.scroll_margin};`);
        if (style.scroll_margin_block) value = this.setValue(value, `scroll-margin-block: ${style.scroll_margin_block};`);
        if (style.scroll_margin_block_end) value = this.setValue(value, `scroll-margin-block-end: ${style.scroll_margin_block_end};`);
        if (style.scroll_margin_block_start) value = this.setValue(value, `scroll-margin-block-start: ${style.scroll_margin_block_start};`);
        if (style.scroll_margin_bottom) value = this.setValue(value, `scroll-margin-bottom: ${style.scroll_margin_bottom};`);
        if (style.scroll_margin_inline) value = this.setValue(value, `scroll-margin-inline: ${style.scroll_margin_inline};`);
        if (style.scroll_margin_inline_end) value = this.setValue(value, `scroll-margin-inline-end: ${style.scroll_margin_inline_end};`);
        if (style.scroll_margin_inline_start) value = this.setValue(value, `scroll-margin-inline-start: ${style.scroll_margin_inline_start};`);
        if (style.scroll_margin_left) value = this.setValue(value, `scroll-margin-left: ${style.scroll_margin_left};`);
        if (style.scroll_margin_right) value = this.setValue(value, `scroll-margin-right: ${style.scroll_margin_right};`);
        if (style.scroll_margin_top) value = this.setValue(value, `scroll-margin-top: ${style.scroll_margin_top};`);
        if (style.scroll_padding) value = this.setValue(value, `scroll-padding: ${style.scroll_padding};`);
        if (style.scroll_padding_block) value = this.setValue(value, `scroll-padding-block: ${style.scroll_padding_block};`);
        if (style.scroll_padding_block_end) value = this.setValue(value, `scroll-padding-block-end: ${style.scroll_padding_block_end};`);
        if (style.scroll_padding_block_start) value = this.setValue(value, `scroll-padding-block-start: ${style.scroll_padding_block_start};`);
        if (style.scroll_padding_bottom) value = this.setValue(value, `scroll-padding-bottom: ${style.scroll_padding_bottom};`);
        if (style.scroll_padding_inline) value = this.setValue(value, `scroll-padding-inline: ${style.scroll_padding_inline};`);
        if (style.scroll_padding_inline_end) value = this.setValue(value, `scroll-padding-inline-end: ${style.scroll_padding_inline_end};`);
        if (style.scroll_padding_inline_start) value = this.setValue(value, `scroll-padding-inline-start: ${style.scroll_padding_inline_start};`);
        if (style.scroll_padding_left) value = this.setValue(value, `scroll-padding-left: ${style.scroll_padding_left};`);
        if (style.scroll_padding_right) value = this.setValue(value, `scroll-padding-right: ${style.scroll_padding_right};`);
        if (style.scroll_padding_top) value = this.setValue(value, `scroll-padding-top: ${style.scroll_padding_top};`);
        if (style.scroll_snap_align) value = this.setValue(value, `scroll-snap-align: ${style.scroll_snap_align};`);
        if (style.scroll_snap_stop) value = this.setValue(value, `scroll-snap-stop: ${style.scroll_snap_stop};`);
        if (style.scroll_snap_type) value = this.setValue(value, `scroll-snap-type: ${style.scroll_snap_type};`);
        if (style.scrollbar_color) value = this.setValue(value, `scrollbar-color: ${style.scrollbar_color};`);
        if (style.shape_outside) value = this.setValue(value, `shape-outside: ${style.shape_outside};`);
        if (style._starting_style) value = this.setValue(value, `@starting-style: ${style._starting_style};`);
        if (style._supports) value = this.setValue(value, `@supports: ${style._supports};`);

        if (style.tab_size) value = this.setValue(value, `tab-size: ${style.tab_size};`);
        if (style.table_layout) value = this.setValue(value, `table-layout: ${style.table_layout};`);
        if (style.text_align) value = this.setValue(value, `text-align: ${style.text_align};`);
        if (style.text_align_last) value = this.setValue(value, `text-align-last: ${style.text_align_last};`);
        if (style.text_combine_upright) value = this.setValue(value, `text-combine-upright: ${style.text_combine_upright};`);
        if (style.text_decoration) value = this.setValue(value, `text-decoration: ${style.text_decoration};`);
        if (style.text_decoration_color) value = this.setValue(value, `text-decoration-color: ${style.text_decoration_color};`);
        if (style.text_decoration_line) value = this.setValue(value, `text-decoration-line: ${style.text_decoration_line};`);
        if (style.text_decoration_style) value = this.setValue(value, `text-decoration-style: ${style.text_decoration_style};`);
        if (style.text_decoration_thickness) value = this.setValue(value, `text-decoration-thickness: ${style.text_decoration_thickness};`);
        if (style.text_emphasis) value = this.setValue(value, `text-emphasis: ${style.text_emphasis};`);
        if (style.text_emphasis_color) value = this.setValue(value, `text-emphasis-color: ${style.text_emphasis_color};`);
        if (style.text_emphasis_position) value = this.setValue(value, `text-emphasis-position: ${style.text_emphasis_position};`);
        if (style.text_emphasis_style) value = this.setValue(value, `text-emphasis-style: ${style.text_emphasis_style};`);
        if (style.text_indent) value = this.setValue(value, `text-indent: ${style.text_indent};`);
        if (style.text_justify) value = this.setValue(value, `text-justify: ${style.text_justify};`);
        if (style.text_orientation) value = this.setValue(value, `text-orientation: ${style.text_orientation};`);
        if (style.text_overflow) value = this.setValue(value, `text-overflow: ${style.text_overflow};`);
        if (style.text_shadow) value = this.setValue(value, `text-shadow: ${style.text_shadow};`);
        if (style.text_transform) value = this.setValue(value, `text-transform: ${style.text_transform};`);
        if (style.text_underline_offset) value = this.setValue(value, `text-underline-offset: ${style.text_underline_offset};`);
        if (style.text_underline_position) value = this.setValue(value, `text-underline-position: ${style.text_underline_position};`);
        if (style.top) value = this.setValue(value, `top: ${style.top};`);
        if (style.transform) value = this.setValue(value, `transform: ${style.transform};`);
        if (style.transform_origin) value = this.setValue(value, `transform-origin: ${style.transform_origin};`);
        if (style.transform_style) value = this.setValue(value, `transform-style: ${style.transform_style};`);
        if (style.transition) value = this.setValue(value, `transition: ${style.transition};`);
        if (style.transition_delay) value = this.setValue(value, `transition-delay: ${style.transition_delay};`);
        if (style.transition_duration) value = this.setValue(value, `transition-duration: ${style.transition_duration};`);
        if (style.transition_property) value = this.setValue(value, `transition-property: ${style.transition_property};`);
        if (style.transition_timing_function) value = this.setValue(value, `transition-timing-function: ${style.transition_timing_function};`);
        if (style.translate) value = this.setValue(value, `translate: ${style.translate};`);

        if (style.unicode_bidi) value = this.setValue(value, `unicode-bidi: ${style.unicode_bidi};`);
        if (style.user_select) value = this.setValue(value, `user-select: ${style.user_select};`);

        if (style.vertical_align) value = this.setValue(value, `vertical-align: ${style.vertical_align};`);
        if (style.visibility) value = this.setValue(value, `visibility: ${style.visibility};`);

        if (style.white_space) value = this.setValue(value, `white-space: ${style.white_space};`);
        if (style.widows) value = this.setValue(value, `widows: ${style.widows};`);
        if (style.width) value = this.setValue(value, `width: ${style.width};`);
        if (style.word_break) value = this.setValue(value, `word-break: ${style.word_break};`);
        if (style.word_spacing) value = this.setValue(value, `word-spacing: ${style.word_spacing};`);
        if (style.word_wrap) value = this.setValue(value, `word-wrap: ${style.word_wrap};`);
        if (style.writing_mode) value = this.setValue(value, `writing-mode: ${style.writing_mode};`);

        if (style.z_index) value = this.setValue(value, `z-index: ${style.z_index};`);
        if (style.zoom) value = this.setValue(value, `zoom: ${style.zoom};`);

        return value;
    }

    private setValue(acc: string, val: string): string {
        return this.options.minify ?
            `${acc} ${val}`
            : `${acc}
               ${val}`
    }
}