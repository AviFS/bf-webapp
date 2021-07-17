function log(tape, ptr) {
    var debug = '';
    var curr;
    for (var i = 0; i < 4; i++) {
        curr = tape[i].toString().padStart(3, ' ');
        if (i == ptr) { curr += '*'; }
        else { curr += ' '; }
        debug += curr + '    ';
    }
    return debug + '\n';
}

function interp(code, input) {
    var tape = new Array(9).fill(0); 
    var ptr = 0; var inputIndex = 0;
    var output = ''; var debug = '';

    var bf2js = "function compile() {"
    for (const c of code) {
        if (c == "+") { bf2js += "tape[ptr]++;"; }
        if (c == "-") { bf2js += "tape[ptr]--;"; }
        if (c == ">") { bf2js += "ptr++;"; }
        if (c == "<") { bf2js += "ptr--;"; }
        if (c == ",") { bf2js += "tape[ptr] = input.codePointAt(inputIndex);"; }
        if (c == ".") { bf2js += "output += String.fromCodePoint(tape[ptr]);"; }
        if (c == "[") { bf2js += "while (tape[ptr]) {"; }
        if (c == "]") { bf2js += "}"; }
        if (c == "#") { bf2js += "debug += log(tape, ptr);"; }
        bf2js += "tape[ptr]=(tape[ptr]+256)%256;";
    }
    bf2js += "return [output, debug];} compile();"
    return eval(bf2js).join('\n---\n');
}

