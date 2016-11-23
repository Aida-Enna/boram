/**
 * Codecs tab.
 * @module boram/encoder/codecs
 */

import React from "react";
import {useSheet} from "../jss";
import {
  MenuItem,
  Prop,
  SmallSelect, SmallInput,
  InlineCheckbox,
  ArgsInput,
  Sep,
} from "../theme";

@useSheet({
  prop: {
    lineHeight: "48px",
  },
  propArgs: {
    lineHeight: "48px",
    verticalAlign: "top",
  },
  valueArgs: {
    // FIXME(Kagami): Use display flex in <Prop> instead.
    width: "calc(100% - 150px)",
    maxWidth: "none",
  },
})
export default class extends React.PureComponent {
  render() {
    const {classes} = this.sheet;
    return (
      <div>
        <Prop name="fragment" nameClassName={classes.prop}>
          <SmallInput
            ref="start"
            width={75}
            hintText="start"
            onBlur={this.props.onUpdate}
          />
          <Sep>÷</Sep>
          <SmallInput
            ref="end"
            hintText="end"
            width={75}
            onBlur={this.props.onUpdate}
          />
        </Prop>
        <Prop name="video codec" nameClassName={classes.prop}>
          <SmallSelect
            width={75}
            value={this.props.vcodec}
            onChange={this.props.makeSelecter("vcodec")}
          >
            <MenuItem primaryText="vp9" value="vp9" />
            <MenuItem primaryText="vp8" value="vp8" />
          </SmallSelect>
          <Sep/>
          <SmallInput
            ref="limit"
            hintText={this.props.modeLimit ? "limit" : "bitrate"}
            disabled={this.props.modeCRF}
            onBlur={this.props.onUpdate}
          />
          <Sep/>
          <SmallInput
            ref="crf"
            hintText="quality"
            onBlur={this.props.onUpdate}
          />
        </Prop>
        <Prop name="audio codec" nameClassName={classes.prop}>
          <SmallSelect
            width={75}
            value={this.props.acodec}
            disabled={!this.props.hasAudio}
            onChange={this.props.makeSelecter("acodec")}
          >
            <MenuItem primaryText="opus" value="opus" />
            <MenuItem primaryText="vorbis" value="vorbis" />
          </SmallSelect>
          <Sep/>
          <SmallInput
            ref="ab"
            hintText={this.props.acodec === "opus" ? "bitrate" : "quality"}
            disabled={!this.props.hasAudio}
            onBlur={this.props.onUpdate}
          />
        </Prop>
        <Prop name="mode" nameClassName={classes.prop}>
          <InlineCheckbox
            label="2pass"
            title="Use 2pass encode (recommended)"
            checked={this.props.mode2Pass}
            onCheck={this.props.makeChecker("mode2Pass")}
          />
          <Sep/>
          <InlineCheckbox
            label="limit"
            title="Switch between fit-to-limit and manual-bitrate modes"
            checked={this.props.modeLimit}
            disabled={this.props.modeCRF}
            onCheck={this.props.makeChecker("modeLimit")}
          />
          <Sep/>
          <InlineCheckbox
            label="crf"
            title="Use CRF mode (recommended for short clips)"
            checked={this.props.modeCRF}
            onCheck={this.props.makeChecker("modeCRF")}
          />
        </Prop>
        <Prop
          name="raw args"
          nameClassName={classes.propArgs}
          valueClassName={classes.valueArgs}
        >
          <ArgsInput
            ref="rawArgs"
            onChange={this.props.onRawArgs}
          />
        </Prop>
      </div>
    );
  }
}