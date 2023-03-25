import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';

const UserDetails = ({ user }) => {

        // fetch the posts from the database, and delete the 
    // respective post by getting it by id
    const handleClick = async () => {
      await fetch('/users/' + user._id, {
        method: 'DELETE'
      })

      console.log('deleted' + user._id);
    }

  return (
    <>
    {/* if there are users, display them. if not, create a default page for the viewer to see.
    ugly formatting and waste of space on the right but grid layout didn't want to work so this 
    will have to do for now. */}
    { user ?
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Username: {user.username}</Card.Title>
          <Card.Title>Email: {user.email}</Card.Title>
          <Button variant="danger" onClick={handleClick}>Danger</Button>
        </Card.Body>
      </Card>
      <br />
    </div>
    : 
      <div>
        <div>
          <p>No user!</p>
        </div>
    </div>
  }
  </>
  );
};

export default UserDetails;