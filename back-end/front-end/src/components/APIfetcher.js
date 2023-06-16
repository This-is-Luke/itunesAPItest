// this file handles the API fetch and displays the results
// we will be using this file to display the results of the API fetch as well as the favorites
// Import necessary modules
import React, { useState } from 'react';
import styled from 'styled-components';

// Define styled components for layout and styling
// this container will hold the search results and the favorites
const Container = styled.div`
	display: flex;
	flex-direction: row;
	height: 100%;
	font-size: 1.2rem;
`;
// this column will hold the favorites
const LeftColumn = styled.div`
	flex: 1;
	background-color: #f0f0f0;
	padding: 20px;
`;
// this column will hold the search results
const RightColumn = styled.div`
	flex: 2;
	background-color: #ffffff;
	padding: 20px;
`;
// this will hold the search form
const SearchListItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	margin-bottom: 5px;
	background-color: ${({ index }) =>
		index % 2 === 1 ? '#f0f0f0' : 'transparent'};
`;

const ListItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	margin-bottom: 5px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const Label = styled.label`
	display: flex;
	flex-direction: column;
	font-size: 18px;
`;

const Input = styled.input`
	padding: 5px;
	font-size: 16px;
	border-radius: 3px;
	border: 1px solid #ccc;
`;

const Select = styled.select`
	padding: 5px;
	font-size: 16px;
	border-radius: 3px;
	border: 1px solid #ccc;
`;

// this is the button formating
const Button = styled.button`
	background-color: #4caf50;
	border: none;
	color: white;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	margin: 4px 2px;
	cursor: pointer;
	padding: 5px 10px;
	border-radius: 5px;
`;


// Main component for fetching data from the API and displaying search results
const APIfetcher = () => {
	// Define state variables
	const [data, setData] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [mediaType, setMediaType] = useState('all');
	const [favorites, setFavorite] = useState([]);
	const [favoriteIds, setFavoriteIds] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	// Function to fetch data from the API
	const fetchData = async () => {
		try {
			const response = await fetch(
				`http://localhost:3001/api/search?term=${searchTerm}&media=${mediaType}`
			);
			const data = await response.json();

			console.log('Server response:', data);

			if (Array.isArray(data)) {
				setData(data);
				handleSearchResults(data);
			} else {
				console.error('Data is not an array:', data);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	// Function to handle search results and display an error message if no results are found
	const handleSearchResults = (data) => {
		if (Array.isArray(data)) {
			if (data.length === 0) {
				setErrorMessage(
					'Oops, nothing found! What was that even? Did you just face plant your keyboard?'
				);
			} else {
				setErrorMessage('');
			}
		}
	};

	// Function to handle media type change
	const handleMediaTypeChange = (event) => {
		setMediaType(event.target.value);
	};

	// Function to handle form submission and fetch data
	const handleSubmit = (e) => {
		e.preventDefault();
		fetchData();
	};

	// Function to add an item to the list of favorites
	const addToFavorite = (item) => {
		const itemCopy = { ...item };
		setFavorite((prevFavorites) => [...prevFavorites, itemCopy]);
		setFavoriteIds((prevFavoriteIds) => [...prevFavoriteIds, item.trackId]);
	};

	// Function to remove an item from the list of favorites
	const removeFromFavorite = (item) => {
		setFavorite((prevFavorites) =>
			prevFavorites.filter(
				(favoriteItem) => favoriteItem.trackId !== item.trackId
			)
		);
		setFavoriteIds((prevFavoriteIds) =>
			prevFavoriteIds.filter((id) => id !== item.trackId)
		);
	};

	return (
		<Container>
			<LeftColumn>
				<h2>Favorites</h2>
				<ul>
					{favorites.map((item, index) => (
						<ListItem key={`${item.trackId}-${index}`}>
							{item.trackName} - {item.artistName}
							<Button onClick={() => removeFromFavorite(item)}>
								Remove from Favorites
							</Button>
						</ListItem>
					))}
				</ul>
			</LeftColumn>
			<RightColumn>
				<h2>Search</h2>
				<Form onSubmit={handleSubmit}>
					<Label>
						Search Term:
						<Input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</Label>
					<Select id="media-type" onChange={handleMediaTypeChange}>
						<option value="all">All</option>
						<option value="movie">Movie</option>
						<option value="podcast">Podcast</option>
						<option value="music">Music</option>
						<option value="audiobook">Audiobook</option>
						<option value="shortFilm">Short Film</option>
						<option value="tvShow">TV Show</option>
						<option value="software">Software</option>
						<option value="ebook">eBook</option>{' '}
					</Select>
					<Button type="submit">Search</Button>
				</Form>
				{errorMessage && <p>{errorMessage}</p>}
				{data && (
					<ul>
						{data.map((item, index) => (
							<SearchListItem
								key={`${item.trackId}_${index}`}
								index={index}
							>
								{item.trackName} - {item.artistName}
								{!favoriteIds.includes(item.trackId) ? (
									<Button onClick={() => addToFavorite(item)}>
										Add to Favorites
									</Button>
								) : null}
							</SearchListItem>
						))}
					</ul>
				)}
			</RightColumn>
		</Container>
	);
};
export default APIfetcher;
