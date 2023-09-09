import { Component } from 'react'
import { SearchBar } from "./SearchBar/SearchBar";
import { AppWrapper } from "./App.styled";
import { LoadMore } from "./LoadMore/LoadMore";
import { GlobalStyles } from "./GlobalStyles";
import { getImages } from "./api";
import { MutatingDots } from 'react-loader-spinner'
import { Gallery } from './Gallery/Gallery';
import { Modal } from './Modal/Modal';

export class App extends Component {
    state = {
        actualQuery: '',
        page: 1,
        images: [],
        loading: false,
        error: false,
        loadMore: false,
        modal: false,
        modalInfo: {}
    };

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.actualQuery !== this.state.actualQuery) {
            const query = this.state.actualQuery.split('/')[1];
            try {
                this.setState({
                    page: 1,
                    loading: true,
                    error: false
                })
                const resp = await getImages(query, 1);
                this.setState({
                    images: resp.hits,
                    loadMore: this.state.page < Math.ceil(resp.totalHits / 12)
                })

            } catch {
                this.setState({ error: true })
            }
            finally {
                this.setState({ loading: false })
            }
        }
    }
    
    onFormSubmit = newQuery => {
        if (newQuery !== this.state.actualQuery) {
            this.setState({actualQuery: `${Date.now()}/${newQuery}`})
        }
    }

    onLoadMore = async () => {
        
        try {
            this.setState({ loading: true })
            const query = this.state.actualQuery.split('/')[1];
            const resp = await getImages(query, this.state.page + 1);
            this.setState(prevState => ({
                page: prevState.page + 1,
                images: [...prevState.images, ...resp.hits],
                loadMore: this.state.page < Math.ceil(resp.totalHits / 12),
            }))
        } catch {
            this.setState({ error: true })
        }
        finally {
            this.setState({ loading: false })
        }
    }

    modalOpen = imageInfo => {
        this.setState({
            modal: true,
            modalInfo: imageInfo
        });
    }


    modalClose = () => {
        this.setState({
            modal: false,
            modalInfo: {}
        })
    }

    render() {
        return (
            <AppWrapper>
                <SearchBar onSubmit={this.onFormSubmit} />
                <Gallery images={this.state.images} modalOpen={this.modalOpen} modalClose={this.modalClose} />
                {this.state.loadMore && <LoadMore onLoadMore={this.onLoadMore} />}
                {this.state.loading && <MutatingDots color='blue' />}
                {this.state.modal && <Modal modalInfo={this.state.modalInfo} modalClose={this.modalClose} />}
                <GlobalStyles />
            </AppWrapper>
        );
    }
}