import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PostPagination from './postPagination/postPagination'
import PageHeader from '../pageHeader/pageHeader'
import SimpleCard from '../simpleCard/simpleCard'
import Typography from '@material-ui/core/Typography';



const styles = theme => ({
  container: {
    position: 'relative',
    textAlign: 'center',
    color: 'black'
  },
  responsive: {
    width: '100%',
    maxHeight: 400,
    height: 'auto'
  },
  topLeft: {
    position: 'absolute',
    top: '8px',
    left: '16px',
  },
  topLeftTwo: {
    position: 'absolute',
    top: '50px',
    left: '25px'
  },
  [theme.breakpoints.down('xs')]: {
    topLeft: {
      top: '8px',
      left: '16px',
      fontSize: 20
    },
    topLeftTwo: {
      top: '30px',
      left: '25px',
      fontSize: 18
    },
  },
  card: {
    alignSelf: 'auto',
    flex: '1 1 auto',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    theme: 'inherit',
    alignContent: 'center'
  },
  root: {
    padding: theme.spacing.unit * 2,
  },
  control: {
    padding: theme.spacing.unit * 2,
  }
})

export class BlogPosts extends Component {
  state = {
    spacing: '40',
  };

  render() {
    const { classes, theme } = this.props
    const { spacing } = this.state
    const { group, index, pageCount } = this.props.pageContext
    const showcaseUrlPrefix = 'showcase/'
    const previousUrl =
      showcaseUrlPrefix + (index - 1 === 1 ? '' : (index - 1).toString())
    const nextUrl = showcaseUrlPrefix + (index + 1).toString()
    const isFirstPage = index - 1 === 0
    const isLastPage = index === pageCount
    const pageHeader = 'Showcase (' + this.props.totalCount + ')'
    const gridContent = group.map(({ node }, index) => (
      <Grid item key={node.id}>
        <SimpleCard
          date={node.frontmatter.date}
          tags={node.frontmatter.tags}
          image={node.frontmatter.image}
          title={node.frontmatter.title}
          author={node.frontmatter.author}
          excerpt={node.frontmatter.excerpt}
          url={node.fields.slug}
          key={index}
        />
      </Grid>
    ))
    return (
      <div>

        <div className={classes.card}>
          <div className={classes.container}>
            <img
              src="/images/showcase2.jpg" className={classes.responsive} />
            <Typography component="h4" variant="h4" className={classes.topLeft}>
              <strong>ERS HCL Open Source</strong>
            </Typography>
            <Typography component="h5" variant="h5" className={classes.topLeftTwo}>
              Projects Showcase
        </Typography>
          </div>
          <PageHeader text={pageHeader.toUpperCase()} />
          <PostPagination
            index={index}
            pageCount={pageCount}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            nextUrl={nextUrl}
            previousUrl={previousUrl}
          />
          <Grid container className={classes.root} spacing={8}>
            <Grid item xs={12}>
              <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
                {gridContent}
              </Grid>
            </Grid>
          </Grid>
          <PostPagination
            index={index}
            pageCount={pageCount}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            nextUrl={nextUrl}
            previousUrl={previousUrl}
          />
        </div>
      </div>
    )
  }
}

BlogPosts.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(BlogPosts)
