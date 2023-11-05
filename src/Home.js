import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import EventTimeline from './Komponenty/EventTimeline';
import EventTimelineMUI from './Komponenty/EventTimelineMUI';
import { Source } from '@mui/icons-material';
import SourceComponent from './SourceComponent';

function Home() {
  const { user } = useContext(AuthContext);

  return (
      <div className="under_nav home">
        <EventTimelineMUI />
        <SourceComponent />
      </div>
  );
}

export default Home;