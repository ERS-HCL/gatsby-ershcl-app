import React from 'react'
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import ToggleStar from 'material-ui/svg-icons/toggle/star'
import ActionLanguage from 'material-ui/svg-icons/action/language'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

const getCorrectTextColor = hex => {
  const threshold = 130 /* about half of 256. Lower threshold equals more dark text on dark background  */

  const hRed = hexToR(hex)
  const hGreen = hexToG(hex)
  const hBlue = hexToB(hex)

  function hexToR(h) {
    return parseInt(cutHex(h).substring(0, 2), 16)
  }
  function hexToG(h) {
    return parseInt(cutHex(h).substring(2, 4), 16)
  }
  function hexToB(h) {
    return parseInt(cutHex(h).substring(4, 6), 16)
  }
  function cutHex(h) {
    return h.charAt(0) == '#' ? h.substring(1, 7) : h
  }

  const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000
  if (cBrightness > threshold) {
    return '#000000'
  } else {
    return '#ffffff'
  }
}

const styles = {
  root: {
    display: 'flex',
    display: 'inline-block'
  },
  paper: {
    margin: 10,
    display: 'flex',
    display: 'inline-block',
    transitionEnabled: true,
    backgroundColor: '#F2F6F7'
  },
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 300,
    minHeight: 220
  },
  chip: {
    display: 'flex',
    margin: 4,
    flexWrap: 'wrap'
  },
  subheader: {
    color: getCorrectTextColor('#ACB7FE')
  }
}
/**
 *
 * @param {*} props (list : Repo list to be displayed,
 *                   title: Title of the list,
 *                   showLang: whether the language propery needs to be shown)
 */
const GitCards = props => {
  const list = props.list
  return (
    <div style={styles.root}>
      <Paper style={styles.paper} zDepth={1}>
        <Subheader style={styles.subheader}>{props.title}</Subheader>
        {list.map(repo => (
          <Paper style={styles.paper} zDepth={2}>
            <Card style={styles.card}>
              <CardHeader
                title={repo.node.name}
                subtitle={repo.node.owner.login}
                avatar={repo.node.owner.avatarUrl}
              />
              <CardText>
                <Chip style={styles.chip}>
                  <Avatar 
                  icon={<ToggleStar/>} 
                  color={orange200}
                  backgroundColor={indigo900}/>
                  {repo.node.stargazers.totalCount}
                </Chip>
                {props.showLang && repo.node.primaryLanguage ? (
                  <Chip
                    style={styles.chip}
                    backgroundColor={repo.node.primaryLanguage.color}
                    labelColor={getCorrectTextColor(repo.node.primaryLanguage.color)}
                  >
                    <Avatar icon={<ActionLanguage />} 
                    color={indigo900}/>
                    {repo.node.primaryLanguage.name}
                  </Chip>
                ) : null}
                <span
                  dangerouslySetInnerHTML={{
                    __html: repo.node.descriptionHTML
                  }}
                />
              </CardText>
              <CardActions>
                <FlatButton
                  href={repo.node.url}
                  target="_blank"
                  label="GITHUB LINK"
                  secondary={true}
                />
              </CardActions>
            </Card>
          </Paper>
        ))}
      </Paper>
    </div>
  )
}

export default GitCards