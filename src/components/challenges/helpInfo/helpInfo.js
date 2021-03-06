import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import PageHeader from '../../pageHeader/pageHeader'
import blue from '@material-ui/core/colors/blue'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

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
    backgroundColor: blue[200],
    alignContent: 'center',
    alignItems: 'center',
    rounded: true,
    borderRadius: 5,
    shadowRadius: 5
  },
  root: {
    width: '90%'
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  subHeader: {
    padding: theme.spacing.unit
  }
})

function getSteps() {
  return [
    'Login / Register',
    'Add a new Idea',
    'Edit existing idea',
    'Save',
    'Global View'
  ]
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `To contribute to this list you need to first login.
              Click on the 'Login' button. This relies on the github OAuth permissions to be enabled.
              When prompted grant the required permissions`
    case 1:
      return `Use the '+' Button to create a new challenge. Note: The new challenges are added with 
              status 'Approval Pending'`
    case 2:
      return `You can only modify your own entries which are with status set to 'Approval Pending'`

    case 3:
      return `Use the 'SAVE' Button to push your changes and make it available for review to the administrator`

    case 4:
      return `Once approved these challenges will appear in the list for everyone to view`

    default:
      return 'Unknown step'
  }
}

class HelpInfo extends React.Component {
  state = {
    activeStep: 0
  }

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    })
  }

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    })
  }

  handleReset = () => {
    this.setState({
      activeStep: 0
    })
  }

  render() {
    const { classes } = this.props
    const steps = getSteps()
    const { activeStep } = this.state

    return (
      <Fade in={true} timeout={100}>
        <Paper className={classes.paper} elevation={4}>
          <PageHeader text="Help" />
          <Typography variant="body1" className={classes.subHeader}>
            Contributing a new challenge
          </Typography>
          <div className={classes.container}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <Typography>{getStepContent(index)}</Typography>
                      <div className={classes.actionsContainer}>
                        <div>
                          <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1
                              ? 'Finish'
                              : 'Next'}
                          </Button>
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                )
              })}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>
                  All steps completed - you&quot;re finished
                </Typography>
                <Button onClick={this.handleReset} className={classes.button}>
                  Reset
                </Button>
              </Paper>
            )}
          </div>
        </Paper>
      </Fade>
    )
  }
}

HelpInfo.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HelpInfo)
