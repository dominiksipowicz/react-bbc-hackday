var search = 'burn';
var url = 'http://localhost:3001/?title=';


var MusicBox = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
    },
    loadMusicFromServer: function() {
        $.ajax({
            url: this.props.url + this.props.search,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data.items});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadMusicFromServer();
    },
    handleFormSubmit: function(search) {
        $.ajax({
            url: this.props.url + search.searchInputValue,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data.items});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div>
                <MusicForm onFormSubmit={this.handleFormSubmit}/>
                <MusicList data={this.state.data} />
            </div>
        );
    }
});

var MusicList = React.createClass({
    render: function() {

        var trackNodes = this.props.data.map(function(track) {
            console.log(track);
            return (
                <tr key={track.id}>
                    <td>{track.artist_display_name}</td>
                    <td><a href={track.snippet_url}>snippet</a></td>
                    <td><a href={track.mp3_href}>{ track.mp3_href ? 'full track' : '' }</a></td>
                </tr>
            );
        });
        return (
            <table className="table table-hover">
                <tbody>
                    {trackNodes}
                </tbody>
            </table>
        );
    }
});

var MusicForm = React.createClass({
    getInitialState: function() {
        return {searchInputValue: ''};
    },
    handleTextChange: function(e) {
        this.setState({searchInputValue: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var text = this.state.searchInputValue.trim();
        if (!text) {
            return;
        }

        this.props.onFormSubmit({searchInputValue: text});

        this.setState({searchInputValue: ''});
    },
    render: function() {
        return (
            <div className="musicForm">
                <form className="form-inline musicForm" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="track name..."
                        value={this.state.searchInputValue}
                        onChange={this.handleTextChange}
                    />
                    <input type="submit" className="btn btn-default" value="search" />
                    </div>
                </form>
            </div>
        );
    }
});

ReactDOM.render(
    <MusicBox url={url} search={search} />,
    document.getElementById('content')
);