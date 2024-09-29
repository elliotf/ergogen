// USB C socket
//
// Normal footprint:
//     _________________
//    |   (2)   (3) (4)|
//    |                |
//    | (1)            |
//    |________________|
//
// Reverse footprint:
//     _________________
//    |   (2)   (3) (4)|
//    | (1)            |
//    | (1)            |
//    |___(2)___(3)_(4)|
//
// Reverse & symmetric footprint:
//     _________________
//    | (1|2)   (3) (4)|
//    |                |
//    |_(1|2)___(3)_(4)|
//
// Nets
//    A: corresponds to pin 1
//    B: corresponds to pin 2
//    C: corresponds to pin 3
//    D: corresponds to pin 4
// Params
//    reverse: default is false
//      if true, will flip the footprint such that the pcb can be reversible

module.exports = {
  params: {
    designator: 'USBC',
    reverse: false,
    symmetric: false,
    skip_stabilizers: false,
    A: undefined, // GND
    B: undefined, // VBUS
    C: undefined,
    D: undefined,
    E: undefined, // VBUS
    F: undefined, // GND
  },
  body: p => {
    const side = (p.reverse) ? "B" : "F";
    const flip = (p.reverse) ? -1 : 1;
    const pads = [
      { n: 1, l: "B12", x: -2.75*flip, w: 0.8,  ts: "3d416885-b8b5-4f5c-bc29-39c6376095e8", net: p.A.str},
      { n: 2, l: "B9",  x: -1.52*flip, w: 0.76, ts: "9cacb6ad-6bbf-4ffe-b0a4-2df24045e046", net: p.B.str},
      { n: 3, l: "A5",  x: -0.5*flip,  w: 0.7,  ts: "272c2a78-b5f5-4b61-aed3-ec69e0e92729", net: p.C.str},
      { n: 4, l: "B5",  x: 0.5*flip,   w: 0.7,  ts: "402c62e6-8d8e-473a-a0cf-2b86e4908cd7", net: p.D.str},
      { n: 5, l: "A9",  x: 1.52*flip,  w: 0.76, ts: "10b20c6b-8045-46d1-a965-0d7dd9a1b5fa", net: p.E.str},
      { n: 6, l: "A12", x: 2.75*flip,  w: 0.8,  ts: "d035bb7a-e806-42f2-ba95-a390d279aef1", net: p.F.str},
    ];
    const standard = `
      (module usb-c-socket-lumpy (layer ${side}.Cu) (tedit 655D029A)
        (attr smd)

        ${p.at /* parametric position */}

        ${'' /* footprint reference */}
        (fp_text reference "${p.ref}" (at 0 -0.5 unlocked) (layer "${side}.SilkS")
          (effects (font (size 1 1) (thickness 0.15)))
        )
        (fp_text value "usb-c-socket" (at 0 1 ${p.rot} unlocked) (layer "${side}.Fab")
          (effects (font (size 1 1) (thickness 0.15)))
          (tstamp c58960d9-4cac-4036-ad2e-1aef26946dae)
        )
        ${pads.map((pad) => {
          return "";
          /*
          (fp_text user "B12" (at -2.75 -9.25 ${p.rot + 90} unlocked) (layer "F.SilkS")
            (effects (font (size 0.7 0.7) (thickness 0.15)))
            (tstamp 029d749e-2289-4769-a0ce-e768bbda0cd0)
          )
          (fp_text user "B5" (at 0.5 -9.25 ${p.rot + 90} unlocked) (layer "F.SilkS")
            (effects (font (size 0.7 0.7) (thickness 0.15)))
            (tstamp 226e6848-5ca6-48e1-bb24-ee9637a3e720)
          )
          (fp_text user "A12" (at 2.75 -9.25 ${p.rot + 90} unlocked) (layer "F.SilkS")
            (effects (font (size 0.7 0.7) (thickness 0.15)))
            (tstamp 5e01567b-a9f5-4f86-b76a-2572d29d2d44)
          )
          (fp_text user "B9" (at -1.52 -9.25 ${p.rot + 90} unlocked) (layer "F.SilkS")
            (effects (font (size 0.7 0.7) (thickness 0.15)))
            (tstamp 70852beb-7102-4701-922b-9248dc6321b9)
          )
          (fp_text user "A5" (at -0.5 -9.25 ${p.rot + 90} unlocked) (layer "F.SilkS")
            (effects (font (size 0.7 0.7) (thickness 0.15)))
            (tstamp aa4294ff-e846-499a-a8cf-1632eb69d9c0)
          )
          (fp_text user "A9" (at 1.52 -9.25 ${p.rot + 90} unlocked) (layer "F.SilkS")
            (effects (font (size 0.7 0.7) (thickness 0.15)))
            (tstamp bad15ef1-4174-4239-b07e-7b1abace56d9)
          )
        (fp_text user "\${REFERENCE}" (at 0 2.5 unlocked) (layer "${side}.Fab")
          (effects (font (size 1 1) (thickness 0.15)))
          (tstamp 5b96c1ad-46ba-4366-8241-fbc1cd0e9bbd)
        )
          */
          return `
          (fp_text user "B12" (at ${pad.x} -9.25 ${p.rot + 90} unlocked) (layer "${side}.SilkS")
            (effects (font (size 0.7 0.7) (thickness 0.15)))
            (tstamp 029d749e-2289-4769-a0ce-e768bbda0cd0)
          )
          `;
        }).join("")}
        ${"" /* (fp_rect (start -5 -8) (end 5 0) (layer "${side}.SilkS") (width 0.1) (fill none) (tstamp 51c3e3cc-739b-4bac-a271-7f779051de39)) */}

        ${"" /* (pad "" thru_hole oval (at 4.32 -2.6) (size 1.1 1.7) (drill oval 0.6 1.2) (layers *.Cu *.Mask) (tstamp 7bdee640-e6be-4899-b318-a0ad1af68164)) */}
        ${"" /* (pad "" thru_hole oval (at 4.32 -6.4) (size 1.1 1.7) (drill oval 0.6 1.2) (layers *.Cu *.Mask) (tstamp d732dada-3bdf-40ee-b2d0-4e0254c2408c)) */}
        ${"" /* (pad "" thru_hole oval (at -4.32 -6.4) (size 1.1 1.7) (drill oval 0.6 1.2) (layers *.Cu *.Mask) (tstamp e2eaff9d-4c94-4311-bec0-a13146b760ca)) */}
        ${"" /* (pad "" thru_hole oval (at -4.32 -2.6) (size 1.1 1.7) (drill oval 0.6 1.2) (layers *.Cu *.Mask) (tstamp e69003da-ee45-47fd-a7b8-43f97b6fde29)) */}
      `
    function stabilizers(def_pos) {
      if (p.skip_stabilizers) {
        return '';
      }
      return `
        ${'' /* (pad "" np_thru_hole circle (at ${def_pos} 8.6) (size 1.5 1.5) (drill 1.5) (layers *.Cu *.Mask)) */}
        ${'' /* (pad "" np_thru_hole circle (at ${def_pos} 1.6) (size 1.5 1.5) (drill 1.5) (layers *.Cu *.Mask)) */}
        (pad "" thru_hole oval (at 4.32 -2.6  ${p.rot}) (size 1.1 1.7) (drill oval 0.6 1.2) (layers *.Cu *.Mask) (tstamp 7bdee640-e6be-4899-b318-a0ad1af68164))
        (pad "" thru_hole oval (at 4.32 -6.4  ${p.rot}) (size 1.1 1.7) (drill oval 0.6 1.2) (layers *.Cu *.Mask) (tstamp d732dada-3bdf-40ee-b2d0-4e0254c2408c))
        (pad "" thru_hole oval (at -4.32 -6.4 ${p.rot}) (size 1.1 1.7) (drill oval 0.6 1.2) (layers *.Cu *.Mask) (tstamp e2eaff9d-4c94-4311-bec0-a13146b760ca))
        (pad "" thru_hole oval (at -4.32 -2.6 ${p.rot}) (size 1.1 1.7) (drill oval 0.6 1.2) (layers *.Cu *.Mask) (tstamp e69003da-ee45-47fd-a7b8-43f97b6fde29))
      `;
    }
    function pins() {
      return pads.map((pad) => {
        return `
          (pad ${pad.n} smd roundrect (at ${pad.x} -6.4 ${180 + p.rot}) (size ${pad.w} 1.2) (layers "${side}.Cu" "${side}.Paste" "${side}.Mask") ${pad.net} (roundrect_rratio 0.25) (tstamp ${pad.ts}))
        `;
      }).join("");
      return `
        (pad "B12" smd roundrect (at ${-2.75} -6.4 ${180 + p.rot}) (size 0.8 1.2) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25) (tstamp 3d416885-b8b5-4f5c-bc29-39c6376095e8))
        (pad "B9" smd roundrect (at -1.52 -6.4 ${180 + p.rot}) (size 0.76 1.2) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25) (tstamp 9cacb6ad-6bbf-4ffe-b0a4-2df24045e046))
        (pad "A5" smd roundrect (at -0.5 -6.4 ${180 + p.rot}) (size 0.7 1.2) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25) (tstamp 272c2a78-b5f5-4b61-aed3-ec69e0e92729))
        (pad "B5" smd roundrect (at 0.5 -6.4 ${180 + p.rot}) (size 0.7 1.2) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25) (tstamp 402c62e6-8d8e-473a-a0cf-2b86e4908cd7))
        (pad "A9" smd roundrect (at 1.52 -6.4 ${180 + p.rot}) (size 0.76 1.2) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25) (tstamp 10b20c6b-8045-46d1-a965-0d7dd9a1b5fa))
        (pad "A12" smd roundrect (at 2.75 -6.4 ${180 + p.rot}) (size 0.8 1.2) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25) (tstamp d035bb7a-e806-42f2-ba95-a390d279aef1))
      `
    }

    return `
      ${standard}
      ${stabilizers()}
      ${pins()}
      )
    `;
  }
}

