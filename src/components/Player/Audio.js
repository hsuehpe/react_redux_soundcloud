import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Audio extends Component {
    constructor(props, context) {
        super(props, context);
    }

    handleProgressPercent(currentTime, duration) {
        return `${(currentTime / duration) * 100}%`
    }

    handleTimeUpdate() {console.log('timeupdate');
        const audioElement = ReactDOM.findDOMNode(this.refs.audio);
        const {actions, player} = this.props;
        var currentTime = audioElement.currentTime;
        var duration = audioElement.duration;
        if (!player.isDragging) {
            actions.setCurrentTime(currentTime);
            actions.setDuration(duration);
            actions.setProgressPercent(this.handleProgressPercent(currentTime, duration));
        }
    }

    componentDidMount() {console.log('componentDidMount');
        const audioElement = ReactDOM.findDOMNode(this.refs.audio);
        audioElement.addEventListener('timeupdate', e => (this.handleTimeUpdate && this.handleTimeUpdate()))
        //audioElement.addEventListener('timeupdate', this.handleTimeUpdate);
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(props) {console.log('componentWillReceiveProps');
        const {src, player} = props;
        const audioElement = ReactDOM.findDOMNode(this.refs.audio);
        console.log(audioElement.paused, player.isPaused);
        if (src != audioElement.src) audioElement.src = src;
        if (player.isPaused !== audioElement.paused) {console.log('test', player.isPaused);
            player.isPaused ? audioElement.pause() : audioElement.play();
        }
        if (player.volume != audioElement.volume) audioElement.volume = player.volume;
        if (player.isMuted != audioElement.muted) audioElement.muted = player.isMuted;
    }

    render() {
        const { src } = this.props;
        return (
            <audio ref='audio' id='audio' src={src}></audio>
        )
    }
}