import React from "react";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import "./QuestionBox.css";

export default function QuestionBox(props) {
  return (
    <div>
      <Tooltip title={props.text} arrow>
        <IconButton className="question-box-icon" color="info" size="small">
          <HelpIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

QuestionBox.propTypes = {
  text: PropTypes.string,
};
