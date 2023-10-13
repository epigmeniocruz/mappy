import React from "react";
import HelpOutline from "@mui/icons-material/HelpOutline";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";

export default function QuestionBox(props) {
  return (
    <div style={{ display: "inline-block" }}>
      <Tooltip title={props.text} sx={{ fontSize: 17 }} arrow>
        <IconButton className="question-box-icon" color="info">
          <HelpOutline style={{ fontSize: 17 }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

QuestionBox.propTypes = {
  text: PropTypes.string,
};
