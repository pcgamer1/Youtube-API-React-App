import React from 'react' 

class SearchBar extends React.Component {

    state = { text: '' }

    updateVal = (e) => {
        this.setState({ text: e.target.value })
        // console.log(this.state.text)
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        this.props.onTextSubmit(this.state.text)
    }

    render() {
        return (
            <div className='search-bar ui segment'>
                <form onSubmit={this.onFormSubmit} className='ui form'>
                    <div className='field'>
                        <label>Video Search</label>
                        <input type='text' value={this.state.text} onChange={this.updateVal}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBar