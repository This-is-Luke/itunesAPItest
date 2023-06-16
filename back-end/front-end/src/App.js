import React from 'react';
import APIfetcher from './components/APIfetcher';
import styled from 'styled-components';

const Heading = styled.h1`
color: #333;
font-size: 24px;
font-weight: bold;
text-align: center;
margin-bottom: 20px;
`;

const App = () => {
  return (
    <div>
      <Heading>
        This tool will search the Itunes store for content and you can add and remove items from favorites
      </Heading>
      <APIfetcher />
    </div>
  );
};

export default App;
