import React from 'react';
import ReactMarkdown from 'react-markdown';
import syntax from './syntax';

const UserDocumentation = () => <ReactMarkdown source={syntax} />;

export default UserDocumentation;
