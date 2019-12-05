import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import PlayBox from '../common/PlayBox';


const EditorWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Visualizer = ({ editorWidth }) => {
  const [state, setState] = useState({ bottomDrawer: false });
  const [mySongs, setMySongs] = useState([]);
  const [visualizedSongs, setVisualizedSongs] = useState([]);

  const getTotalSongs = () => {
    fetch('https://mqp-server.herokuapp.com/gettotalsongs', {
    // fetch('http://localhost:3000/gettotalsongs', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setMySongs(data);
      });
  };

  useEffect(() => { /*
    const interval = setInterval(() => {
      getTotalSongs();
      console.log('fetching');
    }, 6000);
    return () => clearInterval(interval); */
    getTotalSongs();
    console.log('fetching');
  }, []);

  const deleteVisualizedSong = (song) => {
    const newList = visualizedSongs;
    newList.splice(newList.indexOf(song), 1);
    setVisualizedSongs(newList);
  };

  const loadSong = (songToVisualize) => {
    if (visualizedSongs.includes(songToVisualize.songid)) {
      alert('Song is already there');
      return;
    }
    if (visualizedSongs.length >= 4) {
      alert('You can only play a maximum of 4 songs at the same time');
    } else {
      const newList = visualizedSongs;

      for (let i = 0; i < visualizedSongs.length; i += 1) {
        if (newList[i].songid === songToVisualize.songid) {
          newList.splice(i, 1);
          break;
        }
      }
      setVisualizedSongs(newList.concat(songToVisualize.songid));
    }
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
          <ListItem
            button
            key={song.songid}
            onClick={() => loadSong(song)}
          >
            <ListItemText primary={song.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <div>
      <Button onClick={toggleDrawer('bottom', true)}>All Songs</Button>
      <EditorWrapper>
        {
        mySongs.map((song) => {
          if (visualizedSongs.includes(song.songid)) {
            return (
              <>
                <Tooltip title={`Delete "${song.title}" song`}>
                  <DeleteIcon onClick={() => deleteVisualizedSong(song.songid)} />
                </Tooltip>
                <PlayBox id={song.songid} value={song.content} isReadOnly isCollab editorWidth={editorWidth} editorHeight="50vh" />
              </>
            );
          }
          return null;
        })
    }
      </EditorWrapper>
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

Visualizer.propTypes = {
  editorWidth: PropTypes.string.isRequired,
};


export default Visualizer;
