import React, { Component } from 'react'

export class ParseDictionary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      han: /(\p{Script=Hani})+/gu,
      pinyin: /\[(.*?)\]/,
      jyutping: /\{(.*?)\}/,
      description: /\/([^}]+)\//,
      parsed_dict: {}
    }
    this.parse_file = this.parse_file.bind(this)
  }

  /**
   * Takes a text input of a dictionary and parses it to a json object
   */
  parse_file(input) {

    const {han, pinyin, jyutping, description} = this.state;

    const file = input.target.files[0];
    const reader = new FileReader();
    let dict = {
      "dictionary": {}
    }
    let counter = 0
    let dict_key = ""
    reader.onload = (event) => {
        const file = event.target.result;
        const allLines = file.split(/\r\n|\n/);
        allLines.forEach((line) => { // reads line by line
          dict_key = `${line.match(han)}`.split(",")[0]
          console.log(dict_key)
          dict["dictionary"][dict_key] = {}
          if((line.match(han) || line.match(pinyin) || line.match(jyutping) || line.match(description)) != null) {
            dict["dictionary"][dict_key] = {
              "word": line.match(han),
              "piynin": line.match(pinyin),
              "jyutping": line.match(jyutping),
              "description": line.match(description)
            }
            console.log(dict["dictionary"][dict_key])
            return counter++
          } else {
            return counter
          }
        });

        this.setState({
          parsed_dict: dict
        })
    };

    reader.onerror = (event) => {
        alert(event.target.error.name);
    };

    reader.readAsText(file);
  }

  render() {
    const {parsed_dict} = this.state
    return (
      <div>
        <input type="file" name="file" onChange={(e) => this.parse_file(e)}/>
        <div>{parsed_dict !== null ? JSON.stringify(parsed_dict) : "test"}</div>
      </div>
    )
  }
}

export default ParseDictionary
