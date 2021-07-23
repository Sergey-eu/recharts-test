

import React from 'react';
import './style.css'

export const Incident = () => {
  return (
    <>
      <header>
        <figure>
          <img src="https://myosh.com/wp-content/uploads/2017/11/myosh-logo.png" alt="Company logo" />
          <figcaption>Log an Incident</figcaption>
        </figure>
        <p>Please completethe form to the best of your ability.</p>
        <p>A safety representative will review and make sure it is attended to</p>
      </header>
      <main>
        <form method="" action="">
        <h3>Section A</h3>
        <fieldset className="error">
          <legend>Textfield:</legend>
          <input type="text" id="textfield" placeholder="Input placeholder..." />
          <small>Help text</small>
        </fieldset>
        <fieldset>
          <legend>Textarea:</legend>
          <textarea placeholder="Textarea placeholder..." />
        </fieldset>
        <fieldset>
          <legend>Optiongroup:</legend>
          <input type="radio" id="huey" name="drone" value="huey" />
          <label htmlFor="huey">Huey</label>
          <input type="radio" id="dewey" name="drone" value="dewey" />
          <label htmlFor="dewey">Dewey</label>
        </fieldset>
        <fieldset>
          <input type="checkbox" id="scales" name="scales" />
          <label htmlFor="scales">Checkbox label</label>
        </fieldset>
        <fieldset>
          <legend>Combobox:</legend>
          <select name="select" >
            <optgroup>
              <option value="value1" >Option A</option>
              <option value="value2" >Option B</option>
              <option value="value3" >Option C</option>
            </optgroup>
          </select>
        </fieldset>
        <fieldset>
          <input name="myFile" type="file" title="Upload file"/>
        </fieldset>
        <button>Submit</button>
        </form>
      </main>
      <footer>
        <p>Thanks for helping to keep myosh a safe and happy place to work</p>
      </footer>
    </>
  )
}
