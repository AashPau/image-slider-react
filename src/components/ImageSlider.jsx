import React, { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./styles.css";

export const ImageSlider = ({ url, limit = 5, page = 1 }) => {
	const [images, setImages] = useState([]);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [errorMsg, setErrorMsg] = useState(null);
	const [loading, setLoading] = useState(false);

	const handlePrevious = () => {
		setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
	};
	const handleNext = () => {};

	const fetchImages = async (getUrl) => {
		try {
			setLoading(true);
			const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
			const data = await response.json();
			if (data) {
				setImages(data);
				setLoading(false);
			}
		} catch (e) {
			setErrorMsg(e.message);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (url !== "") fetchImages(url);
	}, [url]);
	console.log(images);
	if (loading) {
		return <div>Loading data ! Please wait</div>;
	}
	if (errorMsg !== null) {
		return <div>Error occured {errorMsg}</div>;
	}
	return (
		<div className="container">
			<BsArrowLeftCircleFill
				onClick={handlePrevious}
				className="arrow arrow-left"
			/>
			{images && images.length
				? images.map((imageItem) => (
						<img
							key={imageItem.id}
							alt={imageItem.download_url}
							src={imageItem.download_url}
							className="current-image"
						/>
				  ))
				: null}
			<BsArrowRightCircleFill
				onClick={handleNext}
				className="arrow arrow-right"
			/>
			<span className="circle-indicators">
				{images && images.length
					? images.map((_, index) => (
							<button key={index} className="current-indicator"></button>
					  ))
					: null}
			</span>
		</div>
	);
};