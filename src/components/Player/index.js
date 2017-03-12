import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import ProgressBar from './ProgressBar';
import ControlPanel from './ControlPanel';
import Audio from './Audio';

export default class Player extends Component {
    constructor(props, context) {
        super(props, context);
    }

    handleSlideProgress(percent) {

        const {player} = this.props;
        var setTime = (percent / 100) * player.duration;
		//this.setState({setTime, setTimeSign: Date.now()})
		//rerender is slow..
		document.querySelector('#audio').currentTime = setTime;
    }

    render() {
        const { src, player, actions } = this.props;
        return (
            <div>
                <Audio
                    src={src}
                    player={player}
                    actions={actions}
                    muted={player.isMuted}
                />
                <ProgressBar
                    {...this.props}
                    handleSlideProgress = {this.handleSlideProgress.bind(this)}
                />
                <ControlPanel
                    {...this.props}
                />
            </div>
        )
    }
}