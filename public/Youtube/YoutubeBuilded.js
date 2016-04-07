'use strict';

var YoutubeElement = React.createClass({
                displayName: "YoutubeElement",

                render: () => {
                                return React.createElement(
                                                "div",
                                                { className: "col s6" },
                                                React.createElement(
                                                                "div",
                                                                { className: "card red accent-4 center white-text waves-effect waves-block waves-light" },
                                                                React.createElement(
                                                                                "div",
                                                                                { className: "card-image activator" },
                                                                                React.createElement("i", { className: "fa fa-youtube-play fa-5x" })
                                                                ),
                                                                React.createElement(
                                                                                "div",
                                                                                { className: "card-content activator" },
                                                                                " Youtube "
                                                                ),
                                                                React.createElement(
                                                                                "div",
                                                                                { className: "card-reveal red lighten-5" },
                                                                                React.createElement(
                                                                                                "span",
                                                                                                { className: "card-title red-text" },
                                                                                                React.createElement("i", { className: "fa fa-times-circle fa-5x" })
                                                                                ),
                                                                                React.createElement(
                                                                                                "form",
                                                                                                { action: "/", method: "post", id: "Youtube_form" },
                                                                                                React.createElement("input", { id: "Youtube_url", type: "text", className: "red white-text" }),
                                                                                                React.createElement("input", { type: "submit", hidden: true }),
                                                                                                React.createElement(
                                                                                                                "a",
                                                                                                                { className: "waves-effect waves-light btn-large red", id: "Youtube_play" },
                                                                                                                React.createElement(
                                                                                                                                "i",
                                                                                                                                { className: "material-icons" },
                                                                                                                                "play_arrow"
                                                                                                                )
                                                                                                ),
                                                                                                React.createElement(
                                                                                                                "a",
                                                                                                                { className: "waves-effect waves-light btn-large red", id: "Youtube_pause" },
                                                                                                                React.createElement(
                                                                                                                                "i",
                                                                                                                                { className: "material-icons" },
                                                                                                                                "pause"
                                                                                                                )
                                                                                                ),
                                                                                                React.createElement(
                                                                                                                "a",
                                                                                                                { className: "waves-effect waves-light btn-large red", id: "Youtube_stop" },
                                                                                                                React.createElement(
                                                                                                                                "i",
                                                                                                                                { className: "material-icons" },
                                                                                                                                "stop"
                                                                                                                )
                                                                                                ),
                                                                                                React.createElement("br", null),
                                                                                                React.createElement(
                                                                                                                "a",
                                                                                                                { className: "waves-effect waves-light btn-large red", id: "Youtube_previous" },
                                                                                                                React.createElement(
                                                                                                                                "i",
                                                                                                                                { className: "material-icons" },
                                                                                                                                "skip_previous"
                                                                                                                )
                                                                                                ),
                                                                                                React.createElement(
                                                                                                                "a",
                                                                                                                { className: "waves-effect waves-light btn-large red", id: "Youtube_next" },
                                                                                                                React.createElement(
                                                                                                                                "i",
                                                                                                                                { className: "material-icons" },
                                                                                                                                "skip_next"
                                                                                                                )
                                                                                                ),
                                                                                                React.createElement(
                                                                                                                "a",
                                                                                                                { className: "waves-effect waves-light btn-large red", id: "Youtube_skipPlaylist" },
                                                                                                                React.createElement(
                                                                                                                                "i",
                                                                                                                                { className: "material-icons" },
                                                                                                                                "trending_flat"
                                                                                                                )
                                                                                                ),
                                                                                                React.createElement(
                                                                                                                "p",
                                                                                                                { className: "range-field" },
                                                                                                                React.createElement("input", { type: "range", id: "Youtube_volume", min: "0", max: "100" })
                                                                                                ),
                                                                                                React.createElement(
                                                                                                                "a",
                                                                                                                { className: "waves-effect waves-light btn-large red", href: "/Youtube", target: "_blank" },
                                                                                                                "Watch"
                                                                                                )
                                                                                )
                                                                )
                                                )
                                );
                }
});

ReactDOM.render(React.createElement(YoutubeElement, null), document.getElementById('youtube'));
