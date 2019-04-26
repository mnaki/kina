const emojiMap = {
    'a': ':regional_indicator_a:',
    'b': ':regional_indicator_b:',
    'c': ':regional_indicator_c:',
    'd': ':regional_indicator_d:',
    'e': ':regional_indicator_e:',
    'f': ':regional_indicator_f:',
    'g': ':regional_indicator_g:',
    'h': ':regional_indicator_h:',
    'i': ':regional_indicator_i:',
    'j': ':regional_indicator_j:',
    'k': ':regional_indicator_k:',
    'l': ':regional_indicator_l:',
    'm': ':regional_indicator_m:',
    'n': ':regional_indicator_n:',
    'o': ':regional_indicator_o:',
    'p': ':regional_indicator_p:',
    'q': ':regional_indicator_q:',
    'r': ':regional_indicator_r:',
    's': ':regional_indicator_s:',
    't': ':regional_indicator_t:',
    'u': ':regional_indicator_u:',
    'v': ':regional_indicator_v:',
    'w': ':regional_indicator_w:',
    'x': ':regional_indicator_x:',
    'y': ':regional_indicator_y:',
    'z': ':regional_indicator_z:',
    ' ': '   '
}

const toReact = (str) => {
    const lCaseStr = str.toLowerCase()
    let ary = []
    for (c of lCaseStr) {
        ary.push(emojiMap[c] || c)
    }
    const final = ary.join('')
    return final
}

module.exports = {
    aliases: [
        "emoji",
        "e"
    ],
    doc: {
        exampleArgs: "words",
        description: "Emoji letters",
    },
    fun: async (ctx) => {

        const msg = ctx.msg
        const query = ctx.args.slice(1).join(" ")
        const content = query.toLowerCase()
        const react = toReact(content)
        setTimeout(() => {
            msg.edit(react)
        }, 500)

    }
}