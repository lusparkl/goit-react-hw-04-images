import { useState, useEffect } from 'react'
import { SearchBar } from "./SearchBar/SearchBar";
import { AppWrapper } from "./App.styled";
import { LoadMore } from "./LoadMore/LoadMore";
import { GlobalStyles } from "./GlobalStyles";
import { getImages } from "./api";
import { MutatingDots } from 'react-loader-spinner'
import { Gallery } from './Gallery/Gallery';
import { Modal } from './Modal/Modal';




export const App = () => {
    const [actualQuery, setActualQuery] = useState('');
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [, setError] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({});

    useEffect(() => {
        if (actualQuery) {
            async function fetchData() {
                const query = actualQuery.split('/')[1];
                try {
                    setPage(1);
                    setLoading(true);
                    setError(false);

                    const resp = await getImages(query, 1);
                    setImages(resp.hits);
                    setLoadMore(page < Math.ceil(resp.totalHits / 12));
                } catch {
                    setError(true);
                } finally {
                    setLoading(false);
                }
            }

            fetchData();
        }

    }, [actualQuery]);


    const onFormSubmit = newQuery => {
        if (newQuery !== actualQuery) {
            setActualQuery(`${Date.now()}/${newQuery}`)
        }
    }

    const onLoadMore = async () => {
        try {
            setLoading(true);
            const query = actualQuery.split('/')[1];
            const nextPage = page + 1;
            const resp = await getImages(query, nextPage);
            setPage(nextPage);
            setImages(prevImages => [...prevImages, ...resp.hits]); 
            setLoadMore(nextPage < Math.ceil(resp.totalHits / 12));
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const modalOpen = imageInfo => {
        setModal(true);
        setModalInfo(imageInfo);
    };


    const modalClose = () => {
        setModal(false);
        setModalInfo([]);
    };

        return (
            <AppWrapper>
                <SearchBar onSubmit={onFormSubmit} />
                <Gallery images={images} modalOpen={modalOpen} modalClose={modalClose} />
                {loadMore && <LoadMore onLoadMore={onLoadMore} />}
                {loading && <MutatingDots color='blue' />}
                {modal && <Modal modalInfo={modalInfo} modalClose={modalClose} />}
                <GlobalStyles />
            </AppWrapper>
        );
}
