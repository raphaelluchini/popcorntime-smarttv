define(['!hbs/handlebars'], function ( Handlebars ){
    function pad(num, opts) {
      var digits = opts.digits || 3;
      if(opts.auto && typeof opts.auto === 'number') {
        digits = String(opts.auto).length;
      }
      var lenDiff = digits - String(num).length;
      var padding = '';
      if (lenDiff > 0) {
        while (lenDiff--) {
          padding += '0';
        }
      }
      return padding + num;
    }

    Handlebars.registerHelper('repeat', function(n, options) {
        options = options || {};
        var _data = {};
        if (options._data) {
          _data = Handlebars.createFrame(options._data);
        }

        var content = '';
        var count = n - 1;
        for (var i = 0; i <= count; i++) {
          _data = {
            index: pad((i + 1), {auto: n})
          };
          content += options.fn(this, {data: _data});
        }
        return new Handlebars.SafeString(content);
    });
});