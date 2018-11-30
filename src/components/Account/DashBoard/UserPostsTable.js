import React from 'react';
import PropTypes from 'prop-types';
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
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
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
            <CustomTableCell>Excerpt</CustomTableCell>
            <CustomTableCell>Date Created</CustomTableCell>
            <CustomTableCell>Date Modified</CustomTableCell>
            <CustomTableCell>Actions</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.posts.map(post => {
            return (
              <TableRow className={classes.row} key={post.postId}>
                <CustomTableCell>{post.title}</CustomTableCell>
                <CustomTableCell>{post.excerpt}</CustomTableCell>
                <CustomTableCell>{post.date_created.toDate().toLocaleString()}</CustomTableCell>
                <CustomTableCell>{post.date_modified}</CustomTableCell>
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
};

export default withStyles(styles)(UserPostsTable);