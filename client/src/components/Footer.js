import './Footer.css'
import React from 'react'

export const Footer = () => {
  return (
    <div className="footer">
      <h4>copyright@ 2024 reserved to Group no: 41</h4>
      <div className="projectMembers">
        <li className="member">
          <div>Ankit Kumar</div>
          <ol>
            <li>Ankit Kumar</li>
            <li>201112280</li>
            <li>CSE-II</li>
          </ol>
        </li>
        <li className="member">
          <div>Nihal Singh Rajora</div>
          <ol>
            <li>Nihal Singh Rajora</li>
            <li>201112435</li>
            <li>CSE-III</li>
          </ol>
        </li>
        <li className="member">
          <div>Kartik Kumar</div>
          <ol>
            <li>kartik Kumar</li>
            <li>201112063</li>
            <li>CSE-I</li>
          </ol>
        </li>
        <li className="member">
          <div>Bhola Kumar</div>
          <ol>
            <li>Bhola Kumar</li>
            <li>201112064</li>
            <li>CSE-I</li>
            <img src="/Bhola - photo.jpg" alt="img" className="image"></img>
          </ol>
        </li>
      </div>
    </div>
  );
}
