var ProjectsList = React.createClass({
  getInitialState() {
    return {data: []};
  },
  componentDidMount() {
    $.ajax({
      url: './js/projects.json',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data.projects});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('./js/projects.json', status, err.toString());
      }.bind(this)
    });
  },
  render() {
    return (
      <div className="projects">
        <Project data={this.state.data} type={this.props.type} />
      </div>
    );
  }
});

var Project = React.createClass({
  rawMarkup(string) {
    return { __html: string ? marked(string, {sanitize: true}) : '' };
  },
  render() {
    var type = this.props.type;
    var projects = this.props.data.filter((item) => item.type === type);
    var filteredProjects = projects.map((project) => {
      return (
        <div className="row" key={project.id}>
          <div className="col-md-5">
            <h3 className="project__title">{project.title}</h3>
            <div className="project__date">{project.date}</div>
            <p className="project__text-label">Role</p>
            <p className="project__role">{project.role}</p>
            <p className="project__text-label">Description</p>
            <div className="project__desc"
              dangerouslySetInnerHTML={this.rawMarkup(project.description)}>
            </div>
            <p className="project__text-label">Technical stack</p>
            <div className={(project.stack) ? "project__desc" : "project__desc hidden"}
              dangerouslySetInnerHTML={this.rawMarkup(project.stack)}>
            </div>
            <a href={project.externalLink} className={(project.externalLink) ? "project__link" : "project__link hidden"} target="_blank">
              {project.externalLabel}
            </a>
          </div>
          <div className="col-md-6">
            <ProjectImages data={project.images} />
          </div>
        </div>
      );
    });
    return (
      <div className="project">
        {filteredProjects}
      </div>
    );
  }
});

var ProjectImages = React.createClass({
  render() {
    var imagesNodes = this.props.data.map((image, i) => {
      return (
        <a href={image.path} target="_blank" key={i}><img src={image.path} /></a>
      );
    });
    return (
      <div className="project__pictures">
        {imagesNodes}
      </div>
    );
  }
});

ReactDOM.render(
  <ProjectsList type={$('#projectsViewer').data('type')} />,
  $('#projectsViewer')[0]
);