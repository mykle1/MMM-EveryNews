/* Magic Mirror
 * Module: MMM-EveryNews
 *
 * By Mykle1
 *
 */
Module.register("MMM-EveryNews", {

    // Module config defaults.
    defaults: {
        useHeader: true,                      // False if you don't want a header
        header: "MMM-EveryNews",        // Any text you want. useHeader must be true
        maxWidth: "350px",
        scroll: true,
        animationSpeed: 3000,                 // fade speed
        initialLoadDelay: 4250,
        retryDelay: 2500,
        rotateInterval:  5 * 60 * 1000,
        updateInterval: 30 * 60 * 1000,
	userAgent: "MagicMirror",		// keeping default simple but can be customized by the user; cannot be blank
    },

    getStyles: function() {
        return ["MMM-EveryNews.css"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        this.sendSocketNotification('CONFIG', this.config);
        requiresVersion: "2.1.0",

        //  Set locale.

	// Initialize variables for module
        this.NatGeo = [];
        this.activeItem = 0;
        this.rotateInterval = null;
        this.scheduleUpdate();
	this.loaded = false;
	this.hasError = false;
	this.errorText = "";
    },

    getDom: function() {

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded && !this.hasError) {
            wrapper.innerHTML = "AnyNews Presents . . .";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        } else if (!this.loaded && this.hasError) {
	    wrapper.innerHTML = "AnyNews Presents . . .<br>" + this.errorText;
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
	}

        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "header");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }

      // loop the obects
      var keys = Object.keys(this.NatGeo);
      if (keys.length > 0) {
        if (this.activeItem >= keys.length) {
            this.activeItem = 0;
        }
        var NatGeo = this.NatGeo[keys[this.activeItem]];


        if (this.config.scroll === true) {

        // The source of the article
        var source = document.createElement("div");
        source.classList.add("xsmall", "bright", "source");
        source.innerHTML = NatGeo.source.name;
        wrapper.appendChild(source);


        // The title
        var title = document.createElement("div");
        title.classList.add("small", "bright", "title");
        title.innerHTML = NatGeo.title;
        wrapper.appendChild(title);


        // The picture
        var pic = document.createElement("div");
        var img = document.createElement("img");
        img.classList.add("photo");
        img.src = NatGeo.urlToImage;
        pic.appendChild(img);
        wrapper.appendChild(pic);


       // The description
        var description = document.createElement("div");
        description.classList.add("xsmall", "bright", "description");
        description.innerHTML = '<marquee behavior="scroll" direction="left" scrollamount="'+this.config.scrollSpeed+'">' + NatGeo.description + '</marquee>';
        wrapper.appendChild(description);

      } else if (this.config.scroll === false) {

        // The source of the article
        var source = document.createElement("div");
        source.classList.add("xsmall", "bright", "source");
        source.innerHTML = NatGeo.source.name;
        wrapper.appendChild(source);


        // The title
        var title = document.createElement("div");
        title.classList.add("small", "bright", "title");
        title.innerHTML = NatGeo.title;
        wrapper.appendChild(title);


        // The picture
        var pic = document.createElement("div");
        var img = document.createElement("img");
        img.classList.add("photo");
        img.src = NatGeo.urlToImage;
        pic.appendChild(img);
        wrapper.appendChild(pic);


       // The description
        var description = document.createElement("div");
        description.classList.add("xsmall", "bright", "description");
        description.innerHTML = NatGeo.description;
        wrapper.appendChild(description);

      }

		}
        return wrapper;
    },


    processNatGeo: function(data) {
        this.NatGeo = data;
      console.log(this.NatGeo);
        this.loaded = true;
    },

    scheduleCarousel: function() {
      //  console.log("Carousel of EveryNews function!");
        this.rotateInterval = setInterval(() => {
            this.activeItem++;
            this.updateDom(this.config.animationSpeed);
        }, this.config.rotateInterval);
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getNatGeo();
        }, this.config.updateInterval);
        this.getNatGeo(this.config.initialLoadDelay);
    },

    getNatGeo: function() {
        this.sendSocketNotification('GET_NATGEO');
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "NATGEO_RESULT") {
	    // reset error if we get a real result
	    this.hasError = false;
	    this.errorText = "";
            this.processNatGeo(payload);
            if (this.rotateInterval == null) {
                this.scheduleCarousel();
            }
            this.updateDom(this.config.animationSpeed);
        } else if (notification === "NATGEO_ERROR") {
	    // Cue up an error code and set the error message based on the returned results
	    this.hasError = true;
	    this.errorText = payload;

	    // Still need to cue the animation etc. so the error message gets displayed.
            if (this.rotateInterval == null) {
                this.scheduleCarousel();
            }
            this.updateDom(this.config.animationSpeed);
	}
        this.updateDom(this.config.initialLoadDelay);
    },
});
