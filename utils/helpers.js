// Formats the date for the created at display
module.exports = {
  format_date: (date) => {
      
      return date.toLocaleString();
    },

    format_date_short: (date) => {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      
      return date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: '2-digit'});
    },


  format_content: (content) => {
      if(content.length > 500) {
          return (content.substring(0,500) + "...");
      } else {
          return content;
      }
  },

  capitalize: (word) => {
      return (word.charAt(0).toUpperCase() + word.slice(1));
  },

  if_eq: (a, b, opts) => {
      if (a == b) {
          return opts.fn(this);
      } else {
          return opts.inverse(this);
      }
  }
};



