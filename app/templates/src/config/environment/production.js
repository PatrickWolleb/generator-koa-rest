'use strict';

// Production config
module.exports = {
  ip:     process.env.IP || undefined,
  port:   process.env.PORT || 8080,
  logType : 'combined'
};