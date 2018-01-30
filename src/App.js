import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            seriesList: [],
            seriesEpisodesList: [],
            bufferStringAll: ""
        };
    }

    componentDidMount() {

        fetch('seriesList.json',{})
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesList: seriesListDepuisFichier});
                fetch('seriesEpisodesList.json',{})
                    .then(reponse2 => reponse2.json())
                    .then(seriesEpisodesListDepuisFichier => {
                        this.setState({seriesEpisodesList : seriesEpisodesListDepuisFichier});
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                alert("j'ai fait ce que j'ai pu");
            });


    }
    handleKeyUp = event => {
        //On récupère la valeur de l'input
        let seriesTitleSearchValue = event.target.value.toLowerCase().trim();

        if(seriesTitleSearchValue !== ""){
            this.setState({bufferStringAll: ""});
            //On filtre la liste des séries en fontion de la recherche
            let matchingSeries = this.state.seriesList.filter(
                a => a.seriesName.toLowerCase().indexOf(seriesTitleSearchValue) > -1
            );
            let bufferString ="";
            for(let matchingSerie of matchingSeries){
                bufferString += "<li>";
                bufferString += matchingSerie.seriesName;
                bufferString += "<ul>";
                //On filtre les episodes correspondant à la série en fonction de l'id
                let matchingSerieEpisodesLists = this.state.seriesEpisodesList.filter(
                  b => b.serie_id === matchingSerie.id
                );
                //On récupère le 1er de la liste
                if(matchingSerieEpisodesLists.length){
                    let matchingSerieEpisodesList = matchingSerieEpisodesLists[0];
                    //On garde dans le tampon les épisodes
                    for(let episode of matchingSerieEpisodesList.episodes_list){
                        bufferString += "<li>" + episode.episodeName + "</li>";
                    }
                }
                bufferString += "</ul>";
                bufferString += "</li>";
                this.setState({bufferStringAll: bufferString});
            }

        }else {
            this.setState({bufferStringAll: ""});
        }
    };

    render() {
        return (
            <div>
                <input type="text" className="App-input" onKeyUp={this.handleKeyUp}/>
                {/*<ul>
                    {this.state.seriesList.length ?
                        this.state.seriesList.map(item => <li key={item.id}>{item.seriesName}</li>)
                        : <li>Loading...</li>
                    }
                </ul>*/}
                <ul dangerouslySetInnerHTML={{__html: this.state.bufferStringAll}}>
                    {/*{this.state.bufferStringAll}*/}
                </ul>
            </div>
        )
    }
}


export default App;
