DownCount
=========

jQuery countdown plugin that accounts for timezone.

# Usage

```JS
$('.countdown').downCount({
    date: '08/27/2013 12:00:00-0500', // Make sure to include the time zone!
}, function () {
    alert('WOOT WOOT, done!');
});
```

# Options
Option | Description
---|---
date | Target date, ex `08/27/2013 12:00:00`
lang | The ISO language code to use for labels. `en` and `de` are currently supported.

You can also append a callback function which is called when countdown finishes.
