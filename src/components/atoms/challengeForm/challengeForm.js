import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Input, { InputLabel } from 'material-ui/Input'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import PageHeader from '../../pageHeader/pageHeader'
import blueGrey from 'material-ui/colors/blueGrey'
import Button from 'material-ui/Button'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'white'
  },
  paper: {
    margin: 5,
    padding: 10,
    transitionEnabled: true,
    backgroundColor: blueGrey[50],
    alignContent: 'center',
    alignItems: 'center',
    rounded: true,
    borderRadius: 5,
    shadowRadius: 5
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  menu: {
    width: 200
  },
  button: {
    alignItems: 'flex-end',
  }
})

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

class ChallengeForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  state = {
    challengeForm: []
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  handleChange = (event, inputIdentifier) => {
    const updatedFormElement = this.state.challengeForm.map(field => {
      if (field.id === inputIdentifier) field.value = event.target.value
      return field
    })

    this.setState({
      challengeForm: updatedFormElement
    })
  }

  componentWillMount() {
    const { selectedRow } = this.props
    this.setState({
      challengeForm: selectedRow
    })
  }

  render() {
    const { classes, selectedRow, handleFormSubmit, handleFormCancel } = this.props

    const formFields = selectedRow.map(field => (
      <TextField
        id={field.id}
        label={field.id.toUpperCase()}
        defaultValue={field.value}
        type={field.type}
        autoComplete="name"
        className={classes.textField}
        helperText={field.helperText}
        margin="normal"
        key={field.id}
        onChange={event => this.handleChange(event, field.id)}
      />
    ))
    return (
      <Paper className={classes.paper} elevation={4}>
        <PageHeader text="Edit" />
        <form
          className={classes.container}
          noValidate
          autoComplete="on"
          onSubmit={this.handleSubmit}
        >
          {formFields}
          <div
            onClick={event =>
              handleFormSubmit(event, this.state.challengeForm)
            }
          >
            <Button color="primary" className={classes.button}>
              UPDATE
            </Button>
          </div>
          <div
          onClick={event =>
            handleFormCancel(event)
          }
        >
          <Button color="primary" className={classes.button}>
            CANCEL
          </Button>
        </div>
        </form>
      </Paper>
    )
  }
}

ChallengeForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChallengeForm)
