import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Radio, { RadioGroup } from 'material-ui/Radio'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog'
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from 'material-ui/Form'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    flex: '0 0 auto',
    margin: `${theme.spacing.unit}px 0`
  }
})

class LoginForm extends React.Component {
  state = {
    open: false,
    username: '',
    password: '',
    usertype: 'existing'
  }

  componentWillMount() {
    const { open } = this.props
    this.setState({
      open: open
    })
  }

  handleUserNameChange = event => {
    this.setState({
      username: event.target.value
    })
  }

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.handleLoginCancel()
  }

  handleLogin = () => {
    this.setState({ open: false })
    this.props.handleLoginSubmit({
      username: this.state.username,
      password: this.state.password,
      usertype: this.state.usertype
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  handleChange = event => {
    this.setState({ usertype: event.target.value })
  }

  render() {
    const { fullScreen, classes } = this.props
    return (
      <div className={classes.root}>
        <Button onClick={this.handleClickOpen}>Open form dialog</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <FormControl
              component="fieldset"
              required
              className={classes.formControl}
            >
              <FormLabel component="legend">Existing or New User</FormLabel>
              <RadioGroup
                aria-label="usertype"
                name="usertype1"
                className={classes.group}
                value={this.state.usertype}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="existing"
                  control={<Radio />}
                  label="Existing User"
                />
                <FormControlLabel
                  value="new"
                  control={<Radio />}
                  label="New User"
                />
              </RadioGroup>
            </FormControl>
            <DialogContentText>Provide Login Credentials</DialogContentText>
            <form noValidate autoComplete="on" onSubmit={this.handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                id="username"
                label="Email Address"
                type="email"
                fullWidth
                autoComplete="username email"
                onChange={event => this.handleUserNameChange(event)}
              />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                autoComplete="current-password"
                onChange={event => this.handlePasswordChange(event)}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleLogin} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired
}

export default withStyles(styles)(withMobileDialog()(LoginForm))
