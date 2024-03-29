import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import DeleteIcon from '@material-ui/icons/Delete';
import PublishIcon from '@material-ui/icons/Publish';
import TitleIcon from '@material-ui/icons/Title';
import Tooltip from '@material-ui/core/Tooltip';
import Cookies from 'universal-cookie';


const MySongs = ({ currentContent, onContentLoad }) => {
  const [state, setState] = useState({ bottomDrawer: false });
  const [mySongs, setMySongs] = useState([]);
  const [newSongTitle, setNewSongTitle] = useState('');

  const cookies = new Cookies();
  const email = cookies.get('email');

  const getAllSongs = () => {
    fetch('https://mqp-server.herokuapp.com/getallsongs', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMySongs(data);
      });
  };

  useEffect(() => {
    getAllSongs();
  });

  const deleteSong = (song) => {
    const conf = confirm(`Are you sure you want to delete ${song.title.trim()}?`);
    if (conf) {
      fetch('https://mqp-server.herokuapp.com/deletesong', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          songID: song.songid,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          alert(`Deleted ${song.title}`);
        });
    }
  };

  const updateContent = (song) => {
    const newContent = currentContent();
    const conf = confirm(`Are you sure you want to update "${song.title.trim()}" with the current content?`);
    if (conf) {
      fetch('https://mqp-server.herokuapp.com/updatecontent', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          songContent: newContent,
          songID: song.songid,
        }),
      })
        .then((res) => {
          res.json();
        })
        .then(() => {
          onContentLoad(newContent);
          alert(`Updated "${song.title.trim()}"`);
        });
    }
  };

  const updateTitle = (song) => {
    if (newSongTitle === '') {
      alert('Please enter a valid title');
      return;
    }
    const conf = confirm(`Are you sure you want to rename "${song.title.trim()}" to "${newSongTitle}" ?`);
    if (conf) {
      fetch('https://mqp-server.herokuapp.com/updatetitle', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          songTitle: newSongTitle,
          songID: song.songid,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          setNewSongTitle(newSongTitle);
          alert(`Renamed "${song.title.trim()}" to "${newSongTitle}"`);
        });
    }
  };

  const loadSong = (song) => {
    // TODO: pass content to the PlayBox
    onContentLoad(song.content.trim());
    setNewSongTitle(song.title.trim());
  };

  const toggleDrawer = (side, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const fullList = (side) => (
    <div
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {mySongs.map((song) => (
          <ListItem button key={song.songid} onClick={() => loadSong(song)}>
            <ListItemText primary={song.title} />
            <Tooltip title="Delete song">
              <DeleteIcon onClick={() => deleteSong(song)} />
            </Tooltip>
            <Tooltip title="Update song content">
              <PublishIcon onClick={() => updateContent(song)} />
            </Tooltip>
            <Tooltip title="Rename song">
              <TitleIcon onClick={() => updateTitle(song)} />
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const onInputChange = (event) => {
    setNewSongTitle(event.target.value);
  };

  const saveSong = () => {
    const newContent = currentContent();
    if (newSongTitle === '') {
      alert('Please add a title for your song');
    }
    if (newContent === '') {
      alert('Please add content to your song');
    } else {
      fetch('https://mqp-server.herokuapp.com/savesong', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          songTitle: newSongTitle,
          songContent: newContent,
          email,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          alert('Saved successfully!');
        });
    }
  };

  return (
    <div>
      <Button onClick={toggleDrawer('bottom', true)}>My Songs</Button>
      <Input placeholder="Song Title" onChange={onInputChange} value={newSongTitle} />
      <Button onClick={() => saveSong()}>Save Song</Button>
      <SwipeableDrawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer('bottom', false)}
        onOpen={toggleDrawer('bottom', true)}
      >
        {fullList('bottom')}
      </SwipeableDrawer>
    </div>
  );
};

MySongs.propTypes = {
  currentContent: PropTypes.func.isRequired,
  onContentLoad: PropTypes.func.isRequired,
};

export default MySongs;
