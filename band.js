/*! BandJS - v1.1.1 - 2014-07-22 */
!(function (a) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = a();
  else if ("function" == typeof define && define.amd) define([], a);
  else {
    var b;
    "undefined" != typeof window
      ? (b = window)
      : "undefined" != typeof global
      ? (b = global)
      : "undefined" != typeof self && (b = self),
      (b.BandJS = a());
  }
})(function () {
  return (function a(b, c, d) {
    function e(g, h) {
      if (!c[g]) {
        if (!b[g]) {
          var i = "function" == typeof require && require;
          if (!h && i) return i(g, !0);
          if (f) return f(g, !0);
          throw new Error("Cannot find module '" + g + "'");
        }
        var j = (c[g] = { exports: {} });
        b[g][0].call(
          j.exports,
          function (a) {
            var c = b[g][1][a];
            return e(c ? c : a);
          },
          j,
          j.exports,
          a,
          b,
          c,
          d
        );
      }
      return c[g].exports;
    }
    for (
      var f = "function" == typeof require && require, g = 0;
      g < d.length;
      g++
    )
      e(d[g]);
    return e;
  })(
    {
      1: [
        function (a, b, c) {
          !(function (a) {
            "object" == typeof c && (b.exports = a());
          })(function () {
            return window.AudioContext || window.webkitAudioContext;
          });
        },
        {},
      ],
      2: [
        function (a, b) {
          function c(b, c) {
            if (
              (b || (b = "equalTemperament"),
              c || (c = "northAmerican"),
              "undefined" == typeof d.tuning[b])
            )
              throw new Error(b + " is not a valid tuning pack.");
            if ("undefined" == typeof d.rhythm[c])
              throw new Error(c + " is not a valid rhythm pack.");
            var e,
              f = this,
              g = function () {},
              h = a("audiocontext"),
              i = { 2: 6, 4: 3, 8: 4.5 };
            (f.packs = d),
              (f.pitches = d.tuning[b]),
              (f.notes = d.rhythm[c]),
              (f.audioContext = new h()),
              (f.masterVolumeLevel = null),
              (f.masterVolume = f.audioContext.createGain()),
              f.masterVolume.connect(f.audioContext.destination),
              (f.beatsPerBar = null),
              (f.noteGetsBeat = null),
              (f.tempo = null),
              (f.instruments = []),
              (f.totalDuration = 0),
              (f.currentSeconds = 0),
              (f.percentageComplete = 0),
              (f.noteBufferLength = 20),
              (f.onTickerCallback = g),
              (f.onFinishedCallback = g),
              (f.onDurationChangeCallback = g),
              (f.load = function (a) {
                if ((f.instruments.length > 0 && f.destroy(), !a))
                  throw new Error("JSON is required for this method to work.");
                if ("undefined" == typeof a.instruments)
                  throw new Error("You must define at least one instrument");
                if ("undefined" == typeof a.notes)
                  throw new Error("You must define notes for each instrument");
                "undefined" != typeof a.timeSignature &&
                  f.setTimeSignature(a.timeSignature[0], a.timeSignature[1]),
                  "undefined" != typeof a.tempo && f.setTempo(a.tempo);
                var b = {};
                for (var c in a.instruments)
                  a.instruments.hasOwnProperty(c) &&
                    (b[c] = f.createInstrument(
                      a.instruments[c].name,
                      a.instruments[c].pack
                    ));
                for (var d in a.notes)
                  if (a.notes.hasOwnProperty(d))
                    for (var e = -1; ++e < a.notes[d].length; ) {
                      var g = a.notes[d][e];
                      if ("string" == typeof g) {
                        var h = g.split("|");
                        "rest" === h[1]
                          ? b[d].rest(h[0])
                          : b[d].note(h[0], h[1], h[2]);
                      } else
                        "rest" === g.type
                          ? b[d].rest(g.rhythm)
                          : "note" === g.type &&
                            b[d].note(g.rhythm, g.pitch, g.tie);
                    }
                return f.finish();
              }),
              (f.createInstrument = function (b, c) {
                var d = a("./instrument.js"),
                  e = new d(b, c, f);
                return f.instruments.push(e), e;
              }),
              (f.finish = function () {
                var b = a("./player.js");
                return (e = new b(f));
              }),
              (f.destroy = function () {
                (f.audioContext = new h()),
                  (f.instruments.length = 0),
                  (f.masterVolume = f.audioContext.createGain()),
                  f.masterVolume.connect(f.audioContext.destination);
              }),
              (f.setMasterVolume = function (a) {
                a > 1 && (a /= 100),
                  (f.masterVolumeLevel = a),
                  f.masterVolume.gain.setValueAtTime(
                    a,
                    f.audioContext.currentTime
                  );
              }),
              (f.getTotalSeconds = function () {
                return Math.round(f.totalDuration);
              }),
              (f.setTickerCallback = function (a) {
                if ("function" != typeof a)
                  throw new Error("Ticker must be a function.");
                f.onTickerCallback = a;
              }),
              (f.setTimeSignature = function (a, b) {
                if ("undefined" == typeof i[b])
                  throw new Error(
                    "The bottom time signature is not supported."
                  );
                (f.beatsPerBar = a), (f.noteGetsBeat = i[b]);
              }),
              (f.setTempo = function (a) {
                (f.tempo = 60 / a),
                  e && (e.resetTempo(), f.onDurationChangeCallback());
              }),
              (f.setOnFinishedCallback = function (a) {
                if ("function" != typeof a)
                  throw new Error("onFinished callback must be a function.");
                f.onFinishedCallback = a;
              }),
              (f.setOnDurationChangeCallback = function (a) {
                if ("function" != typeof a)
                  throw new Error(
                    "onDurationChanged callback must be a function."
                  );
                f.onDurationChangeCallback = a;
              }),
              (f.setNoteBufferLength = function (a) {
                f.noteBufferLength = a;
              }),
              f.setMasterVolume(100),
              f.setTempo(120),
              f.setTimeSignature(4, 4);
          }
          b.exports = c;
          var d = { instrument: {}, rhythm: {}, tuning: {} };
          c.loadPack = function (a, b, c) {
            if (-1 === ["tuning", "rhythm", "instrument"].indexOf(a))
              throw new Error(a + " is not a valid Pack Type.");
            if ("undefined" != typeof d[a][b])
              throw new Error(
                "A(n) " +
                  a +
                  ' pack with the name "' +
                  b +
                  '" has already been loaded.'
              );
            d[a][b] = c;
          };
        },
        { "./instrument.js": 5, "./player.js": 7, audiocontext: 1 },
      ],
      3: [
        function (a, b) {
          function c(a, b) {
            function c(a) {
              for (
                var c = 2 * b.sampleRate,
                  d = b.createBuffer(1, c, b.sampleRate),
                  e = d.getChannelData(0),
                  f = 0;
                c > f;
                f++
              )
                e[f] = 2 * Math.random() - 1;
              var g = b.createBufferSource();
              return (g.buffer = d), (g.loop = !0), g.connect(a), g;
            }
            function d(a) {
              var c,
                d,
                e,
                f,
                g,
                h,
                i,
                j = 2 * b.sampleRate,
                k = b.createBuffer(1, j, b.sampleRate),
                l = k.getChannelData(0);
              c = d = e = f = g = h = i = 0;
              for (var m = 0; j > m; m++) {
                var n = 2 * Math.random() - 1;
                (c = 0.99886 * c + 0.0555179 * n),
                  (d = 0.99332 * d + 0.0750759 * n),
                  (e = 0.969 * e + 0.153852 * n),
                  (f = 0.8665 * f + 0.3104856 * n),
                  (g = 0.55 * g + 0.5329522 * n),
                  (h = -0.7616 * h - 0.016898 * n),
                  (l[m] = c + d + e + f + g + h + i + 0.5362 * n),
                  (l[m] *= 0.11),
                  (i = 0.115926 * n);
              }
              var o = b.createBufferSource();
              return (o.buffer = k), (o.loop = !0), o.connect(a), o;
            }
            function e(a) {
              for (
                var c = 2 * b.sampleRate,
                  d = b.createBuffer(1, c, b.sampleRate),
                  e = d.getChannelData(0),
                  f = 0,
                  g = 0;
                c > g;
                g++
              ) {
                var h = 2 * Math.random() - 1;
                (e[g] = (f + 0.02 * h) / 1.02), (f = e[g]), (e[g] *= 3.5);
              }
              var i = b.createBufferSource();
              return (i.buffer = d), (i.loop = !0), i.connect(a), i;
            }
            var f = ["white", "pink", "brown", "brownian", "red"];
            if (-1 === f.indexOf(a))
              throw new Error(a + " is not a valid noise sound");
            return {
              createNote: function (b) {
                switch (a) {
                  case "white":
                    return c(b);
                  case "pink":
                    return d(b);
                  case "brown":
                  case "brownian":
                  case "red":
                    return e(b);
                }
              },
            };
          }
          b.exports = c;
        },
        {},
      ],
      4: [
        function (a, b) {
          function c(a, b) {
            var c = ["sine", "square", "sawtooth", "triangle"];
            if (-1 === c.indexOf(a))
              throw new Error(a + " is not a valid Oscillator type");
            return {
              createNote: function (c, d) {
                var e = b.createOscillator();
                return e.connect(c), (e.type = a), (e.frequency.value = d), e;
              },
            };
          }
          b.exports = c;
        },
        {},
      ],
      5: [
        function (a, b) {
          function c(a, b, c) {
            function d(a) {
              if ("undefined" == typeof c.notes[a])
                throw new Error(a + " is not a correct rhythm.");
              return 10 * ((c.notes[a] * c.tempo) / c.noteGetsBeat);
            }
            function e(a) {
              if (null === a || "object" != typeof a) return a;
              var b = a.constructor();
              for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
              return b;
            }
            if (
              (a || (a = "sine"),
              b || (b = "oscillators"),
              "undefined" == typeof c.packs.instrument[b])
            )
              throw new Error(
                b + " is not a currently loaded Instrument Pack."
              );
            var f = this,
              g = 0,
              h = 1,
              i = 0.05;
            (f.totalDuration = 0),
              (f.bufferPosition = 0),
              (f.instrument = c.packs.instrument[b](a, c.audioContext)),
              (f.notes = []),
              (f.setVolume = function (a) {
                return a > 1 && (a /= 100), (h = a), f;
              }),
              (f.note = function (a, b, e) {
                var g = d(a),
                  j = e ? 0 : g * i;
                if (b) {
                  b = b.split(",");
                  for (var k = -1; ++k < b.length; ) {
                    var l = b[k];
                    if (
                      ((l = l.trim()),
                      "undefined" == typeof c.pitches[l] &&
                        ((l = parseFloat(l)), isNaN(l) || 0 > l))
                    )
                      throw new Error(l + " is not a valid pitch.");
                  }
                }
                return (
                  f.notes.push({
                    rhythm: a,
                    pitch: b,
                    duration: g,
                    articulationGap: j,
                    tie: e,
                    startTime: f.totalDuration,
                    stopTime: f.totalDuration + g - j,
                    volumeLevel: h / 4,
                  }),
                  (f.totalDuration += g),
                  f
                );
              }),
              (f.rest = function (a) {
                var b = d(a);
                return (
                  f.notes.push({
                    rhythm: a,
                    pitch: !1,
                    duration: b,
                    articulationGap: 0,
                    startTime: f.totalDuration,
                    stopTime: f.totalDuration + b,
                  }),
                  (f.totalDuration += b),
                  f
                );
              }),
              (f.repeatStart = function () {
                return (g = f.notes.length), f;
              }),
              (f.repeatFromBeginning = function (a) {
                return (g = 0), f.repeat(a), f;
              }),
              (f.repeat = function (a) {
                a = "undefined" == typeof a ? 1 : a;
                for (var b = f.notes.slice(g), c = 0; a > c; c++)
                  for (var d = -1; ++d < b.length; ) {
                    var h = e(b[d]);
                    (h.startTime = f.totalDuration),
                      (h.stopTime =
                        f.totalDuration + h.duration - h.articulationGap),
                      f.notes.push(h),
                      (f.totalDuration += h.duration);
                  }
                return f;
              }),
              (f.resetDuration = function () {
                var a = -1,
                  b = f.notes.length;
                for (f.totalDuration = 0; ++a < b; ) {
                  var c = f.notes[a],
                    e = d(c.rhythm),
                    g = c.tie ? 0 : e * i;
                  (c.duration = d(c.rhythm)),
                    (c.startTime = f.totalDuration),
                    (c.stopTime = f.totalDuration + e - g),
                    c.pitch !== !1 && (c.articulationGap = g),
                    (f.totalDuration += e);
                }
              });
          }
          b.exports = c;
        },
        {},
      ],
      6: [
        function (a, b) {
          (b.exports = a("./conductor.js")),
            b.exports.loadPack(
              "instrument",
              "noises",
              a("./instrument-packs/noises.js")
            ),
            b.exports.loadPack(
              "instrument",
              "oscillators",
              a("./instrument-packs/oscillators.js")
            ),
            b.exports.loadPack(
              "rhythm",
              "northAmerican",
              a("./rhythm-packs/north-american.js")
            ),
            b.exports.loadPack(
              "rhythm",
              "european",
              a("./rhythm-packs/european.js")
            ),
            b.exports.loadPack(
              "tuning",
              "equalTemperament",
              a("./tuning-packs/equal-temperament.js")
            );
        },
        {
          "./conductor.js": 2,
          "./instrument-packs/noises.js": 3,
          "./instrument-packs/oscillators.js": 4,
          "./rhythm-packs/european.js": 8,
          "./rhythm-packs/north-american.js": 9,
          "./tuning-packs/equal-temperament.js": 10,
        },
      ],
      7: [
        function (a, b) {
          function c(a) {
            function b(b) {
              for (var c = -1, f = a.instruments.length; ++c < f; ) {
                var g = a.instruments[c];
                b && g.resetDuration(), (g.bufferPosition = 0);
              }
              for (
                b && (d(), (l = a.percentageComplete * a.totalDuration)),
                  c = -1;
                ++c < k.length;

              )
                k[c].gain.disconnect();
              clearTimeout(h), (k = e());
            }
            function c(b, c, d) {
              if (
                ("undefined" == typeof d && (d = !1),
                "up" !== b && "down" !== b)
              )
                throw new Error("Direction must be either up or down.");
              var e = 0.2;
              (m = "down" === b),
                "up" === b
                  ? (a.masterVolume.gain.linearRampToValueAtTime(
                      0,
                      a.audioContext.currentTime
                    ),
                    a.masterVolume.gain.linearRampToValueAtTime(
                      a.masterVolumeLevel,
                      a.audioContext.currentTime + e
                    ))
                  : (a.masterVolume.gain.linearRampToValueAtTime(
                      a.masterVolumeLevel,
                      a.audioContext.currentTime
                    ),
                    a.masterVolume.gain.linearRampToValueAtTime(
                      0,
                      a.audioContext.currentTime + e
                    )),
                setTimeout(function () {
                  "function" == typeof c && c.call(j),
                    d &&
                      ((m = !m),
                      a.masterVolume.gain.linearRampToValueAtTime(
                        a.masterVolumeLevel,
                        a.audioContext.currentTime
                      ));
                }, 1e3 * e);
            }
            function d() {
              for (var b = -1, c = 0; ++b < a.instruments.length; ) {
                var d = a.instruments[b];
                d.totalDuration > c && (c = d.totalDuration);
              }
              a.totalDuration = c;
            }
            function e() {
              for (
                var b = [], c = -1, d = a.noteBufferLength;
                ++c < a.instruments.length;

              ) {
                for (var e = a.instruments[c], f = d, g = -1; ++g < f; ) {
                  var h = e.notes[e.bufferPosition + g];
                  if ("undefined" == typeof h) break;
                  var i = h.pitch,
                    j = h.startTime,
                    k = h.stopTime,
                    m = h.volumeLevel;
                  if (l > k) f++;
                  else if (!1 !== i) {
                    var n = a.audioContext.createGain();
                    if (
                      (n.connect(a.masterVolume),
                      (n.gain.value = m),
                      l > j && (j = k - l),
                      "undefined" == typeof i)
                    )
                      b.push({
                        startTime: l > j ? k - l : j,
                        stopTime: k,
                        node: e.instrument.createNote(n),
                        gain: n,
                        volumeLevel: m,
                      });
                    else
                      for (var o = -1; ++o < i.length; ) {
                        var p = i[o];
                        b.push({
                          startTime: j,
                          stopTime: k,
                          node: e.instrument.createNote(
                            n,
                            a.pitches[p.trim()] || parseFloat(p)
                          ),
                          gain: n,
                          volumeLevel: m,
                        });
                      }
                  }
                }
                e.bufferPosition += f;
              }
              return b;
            }
            function f() {
              !j.paused &&
                j.playing &&
                (a.totalDuration < l
                  ? (j.stop(!1), j.looping ? j.play() : a.onFinishedCallback())
                  : (g(), setTimeout(f, 1e3 / 60)));
            }
            function g() {
              l += a.audioContext.currentTime - i;
              var b = Math.round(l);
              b != a.currentSeconds &&
                (setTimeout(function () {
                  a.onTickerCallback(b);
                }, 1),
                (a.currentSeconds = b)),
                (a.percentageComplete = l / a.totalDuration),
                (i = a.audioContext.currentTime);
            }
            var h,
              i,
              j = this,
              k = e(),
              l = 0,
              m = !1;
            d(),
              (j.paused = !1),
              (j.playing = !1),
              (j.looping = !1),
              (j.muted = !1),
              (j.play = function () {
                (j.playing = !0),
                  (j.paused = !1),
                  (i = a.audioContext.currentTime),
                  f();
                var b = a.audioContext.currentTime - l,
                  d = function (a) {
                    for (var c = -1; ++c < a.length; ) {
                      var d = a[c],
                        e = d.startTime + b,
                        f = d.stopTime + b;
                      d.tie ||
                        (e > 0 && (e -= 0.001),
                        (f += 0.001),
                        d.gain.gain.setValueAtTime(0, e),
                        d.gain.gain.linearRampToValueAtTime(
                          d.volumeLevel,
                          e + 0.001
                        ),
                        d.gain.gain.setValueAtTime(d.volumeLevel, f - 0.001),
                        d.gain.gain.linearRampToValueAtTime(0, f)),
                        d.node.start(e),
                        d.node.stop(f);
                    }
                  },
                  g = function () {
                    h = setTimeout(function () {
                      if (j.playing && !j.paused) {
                        var a = e();
                        a.length > 0 && (d(a), (k = k.concat(a)), g());
                      }
                    }, 5e3 * a.tempo);
                  };
                d(k), g(), m && !j.muted && c("up");
              }),
              (j.stop = function (d) {
                (j.playing = !1),
                  (a.currentSeconds = 0),
                  (a.percentageComplete = 0),
                  "undefined" == typeof d && (d = !0),
                  d && !j.muted
                    ? c(
                        "down",
                        function () {
                          (l = 0),
                            b(),
                            setTimeout(function () {
                              a.onTickerCallback(a.currentSeconds);
                            }, 1);
                        },
                        !0
                      )
                    : ((l = 0),
                      b(),
                      setTimeout(function () {
                        a.onTickerCallback(a.currentSeconds);
                      }, 1));
              }),
              (j.pause = function () {
                (j.paused = !0),
                  g(),
                  j.muted
                    ? b()
                    : c("down", function () {
                        b();
                      });
              }),
              (j.loop = function (a) {
                j.looping = !!a;
              }),
              (j.setTime = function (a) {
                (l = parseInt(a)), b(), j.playing && !j.paused && j.play();
              }),
              (j.resetTempo = function () {
                b(!0), j.playing && !j.paused && j.play();
              }),
              (j.mute = function (a) {
                (j.muted = !0), c("down", a);
              }),
              (j.unmute = function (a) {
                (j.muted = !1), c("up", a);
              });
          }
          b.exports = c;
        },
        {},
      ],
      8: [
        function (a, b) {
          b.exports = {
            semibreve: 1,
            dottedMinim: 0.75,
            minim: 0.5,
            dottedCrotchet: 0.375,
            tripletMinim: 0.33333334,
            crotchet: 0.25,
            dottedQuaver: 0.1875,
            tripletCrotchet: 0.166666667,
            quaver: 0.125,
            dottedSemiquaver: 0.09375,
            tripletQuaver: 0.083333333,
            semiquaver: 0.0625,
            tripletSemiquaver: 0.041666667,
            demisemiquaver: 0.03125,
          };
        },
        {},
      ],
      9: [
        function (a, b) {
          b.exports = {
            whole: 1,
            dottedHalf: 0.75,
            half: 0.5,
            dottedQuarter: 0.375,
            tripletHalf: 0.33333334,
            quarter: 0.25,
            dottedEighth: 0.1875,
            tripletQuarter: 0.166666667,
            eighth: 0.125,
            dottedSixteenth: 0.09375,
            tripletEighth: 0.083333333,
            sixteenth: 0.0625,
            tripletSixteenth: 0.041666667,
            thirtySecond: 0.03125,
          };
        },
        {},
      ],
      10: [
        function (a, b) {
          b.exports = {
            C0: 16.35,
            "C#0": 17.32,
            Db0: 17.32,
            D0: 18.35,
            "D#0": 19.45,
            Eb0: 19.45,
            E0: 20.6,
            F0: 21.83,
            "F#0": 23.12,
            Gb0: 23.12,
            G0: 24.5,
            "G#0": 25.96,
            Ab0: 25.96,
            A0: 27.5,
            "A#0": 29.14,
            Bb0: 29.14,
            B0: 30.87,
            C1: 32.7,
            "C#1": 34.65,
            Db1: 34.65,
            D1: 36.71,
            "D#1": 38.89,
            Eb1: 38.89,
            E1: 41.2,
            F1: 43.65,
            "F#1": 46.25,
            Gb1: 46.25,
            G1: 49,
            "G#1": 51.91,
            Ab1: 51.91,
            A1: 55,
            "A#1": 58.27,
            Bb1: 58.27,
            B1: 61.74,
            C2: 65.41,
            "C#2": 69.3,
            Db2: 69.3,
            D2: 73.42,
            "D#2": 77.78,
            Eb2: 77.78,
            E2: 82.41,
            F2: 87.31,
            "F#2": 92.5,
            Gb2: 92.5,
            G2: 98,
            "G#2": 103.83,
            Ab2: 103.83,
            A2: 110,
            "A#2": 116.54,
            Bb2: 116.54,
            B2: 123.47,
            C3: 130.81,
            "C#3": 138.59,
            Db3: 138.59,
            D3: 146.83,
            "D#3": 155.56,
            Eb3: 155.56,
            E3: 164.81,
            F3: 174.61,
            "F#3": 185,
            Gb3: 185,
            G3: 196,
            "G#3": 207.65,
            Ab3: 207.65,
            A3: 220,
            "A#3": 233.08,
            Bb3: 233.08,
            B3: 246.94,
            C4: 261.63,
            "C#4": 277.18,
            Db4: 277.18,
            D4: 293.66,
            "D#4": 311.13,
            Eb4: 311.13,
            E4: 329.63,
            F4: 349.23,
            "F#4": 369.99,
            Gb4: 369.99,
            G4: 392,
            "G#4": 415.3,
            Ab4: 415.3,
            A4: 440,
            "A#4": 466.16,
            Bb4: 466.16,
            B4: 493.88,
            C5: 523.25,
            "C#5": 554.37,
            Db5: 554.37,
            D5: 587.33,
            "D#5": 622.25,
            Eb5: 622.25,
            E5: 659.26,
            F5: 698.46,
            "F#5": 739.99,
            Gb5: 739.99,
            G5: 783.99,
            "G#5": 830.61,
            Ab5: 830.61,
            A5: 880,
            "A#5": 932.33,
            Bb5: 932.33,
            B5: 987.77,
            C6: 1046.5,
            "C#6": 1108.73,
            Db6: 1108.73,
            D6: 1174.66,
            "D#6": 1244.51,
            Eb6: 1244.51,
            E6: 1318.51,
            F6: 1396.91,
            "F#6": 1479.98,
            Gb6: 1479.98,
            G6: 1567.98,
            "G#6": 1661.22,
            Ab6: 1661.22,
            A6: 1760,
            "A#6": 1864.66,
            Bb6: 1864.66,
            B6: 1975.53,
            C7: 2093,
            "C#7": 2217.46,
            Db7: 2217.46,
            D7: 2349.32,
            "D#7": 2489.02,
            Eb7: 2489.02,
            E7: 2637.02,
            F7: 2793.83,
            "F#7": 2959.96,
            Gb7: 2959.96,
            G7: 3135.96,
            "G#7": 3322.44,
            Ab7: 3322.44,
            A7: 3520,
            "A#7": 3729.31,
            Bb7: 3729.31,
            B7: 3951.07,
            C8: 4186.01,
          };
        },
        {},
      ],
    },
    {},
    [6]
  )(6);
});
