import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Switch from '@material-ui/core/Switch';

import './index.css';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.gray,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
//    overflowX: 'auto',
  },
  table: {
    minWidth: '40vw',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


function UserPostsTable(props) {
  const { classes } = props;
  const { removePost, editPost } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Title</CustomTableCell>
            <CustomTableCell>Slug</CustomTableCell>
            <CustomTableCell>Private</CustomTableCell>
            <CustomTableCell>Date Created</CustomTableCell>
            <CustomTableCell>Actions</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.posts.map(post => {
            return (
              <TableRow className={classes.row} key={post.postId}>
                <CustomTableCell>
                  <Link to={`/@${post.user.userName}/${post.slug}`}>{post.title}</Link>
                </CustomTableCell>
                <CustomTableCell>{post.slug}</CustomTableCell>
                <CustomTableCell>

                <Switch
                  checked={post.private}
                  color="primary"
                  onChange={(e, v) => {
                    window.confirm(`Are you sure you want to make post ${post.private ? "private" : "public" }`)
                    ? props.togglePrivate(post.postId, 'private', e.target.checked)
                    : e.target.checked = !e.target.checked
                  }}
                />
                </CustomTableCell>
                <CustomTableCell>{post.date_created.toDate().toLocaleString()}</CustomTableCell>
                <CustomTableCell>
                  <IconButton aria-label="Delete" className={classes.margin}
                    onClick = {() => removePost(post.postId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="Edit" className={classes.margin}
                    onClick = {() => editPost(post.postId)}
                  >
                    <EditIcon />
                  </IconButton>
                </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

UserPostsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  
  removePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  togglePrivate: PropTypes.func.isRequired,
};

export default withStyles(styles)(UserPostsTable);