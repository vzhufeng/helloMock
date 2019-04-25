export function tokenizer(input) {
  let current = 0;
  let tokens = [];
  while (current < input.length) {
    let char = input[current];
    // 检测括号
    if (char === "{" || char === "}") {
      tokens.push({
        type: "parent",
        value: char
      });
      current++;
      continue;
    }
    if (char === "[" || char === "]") {
      tokens.push({
        type: "array",
        value: char
      });
      current++;
      continue;
    }
    // 跳过空白字符
    const WHITESPACE = /[\s]/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }
    // 检测属性名
    const PROPS = /[^\{\}\[\]]/i;
    if (PROPS.test(char)) {
      let value = "";
      // 循环检测数字
      while (PROPS.test(char)) {
        value += char;
        char = input[++current];
      }
      const arr = value.split(",");
      for (let i = 0; i < arr.length; i++) {
        const arr2 = arr[i].split(":");
        if (arr2.length > 1) {
          tokens.push({
            type: "prop",
            name: arr2[0].trim(),
            value: arr2[1].trim()
          });
        }
      }
      continue;
    }
    throw new TypeError("解析出错: " + char);
  }
  return tokens;
}

export function parser(tokens) {
  let current = 0;

  function walk() {
    let token = tokens[current];
    if (token.type === "prop") {
      current++;
      if (token.value) {
        return {
          name: token.name,
          value: token.value,
          type: "plain"
        };
      } else {
        token = tokens[current];
        if (token.type === "parent" && token.value === "{") {
          token = tokens[current - 1];
          current++;
          let node = {
            type: "obj",
            name: token.name,
            inner: []
          };
          token = tokens[current];
          while (
            token.type !== "parent" ||
            (token.type === "parent" && token.value !== "}")
          ) {
            node.inner.push(walk());
            token = tokens[current];
          }
          current++;
          return node;
        } else if (token.type === "array" && token.value === "[") {
          token = tokens[current - 1];
          current += 2;
          let node = {
            type: "arr",
            name: token.name,
            inner: []
          };
          token = tokens[current];
          while (
            token.type !== "array" ||
            (token.type === "array" && token.value !== "]")
          ) {
            const temp = walk();
            if (temp) {
              node.inner.push(temp);
            }
            token = tokens[current];
          }
          current++;
          return node;
        }
      }
    }
    current++;
  }
  let ast = {
    body: []
  };
  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}

function gen(ast) {
  function walk(node, parent) {
    const arr = Object.keys(node);
    for (let i = 0; i < arr.length; i++) {
      const key = arr[i];
      const ele = node[key];
      const { name, inner, type, value } = ele || {};
      if (toString.call(ele) === "[object Undefined]") {
        continue;
      } else if (type === "obj") {
        parent[name] = {};
        walk(inner, parent[name]);
      } else if (type === "arr") {
        parent[name] = [{}];
        walk(inner, parent[name][0]);
      } else {
        parent[name] = value;
      }
    }
  }

  let obj = {};
  if (ast.type === "object") {
    walk(ast.body, obj);
  } else {
    obj = [{}];
    walk(ast.body, obj[0]);
  }

  return obj;
}

export function parseJson(input) {
  return deepMergeArr(input);
}

export function parseObject(input) {
  const tok = tokenizer(input);
  const ast = parser(tok);
  if (tok[0].type === "array") {
    ast.type = "array";
  } else {
    ast.type = "object";
  }
  const obj = gen(ast);
  return obj;
}

// 合并数组中不同节点的属性
function deepMergeArr(input) {
  let ret = {};

  function walk(node, parent) {
    const arr = Object.keys(node);
    for (let i = 0; i < arr.length; i++) {
      const key = arr[i];
      const ele = node[key];
      if (toString.call(ele) === "[object Object]") {
        parent[key] = {};
        walk(ele, parent[key]);
      } else if (toString.call(ele) === "[object Array]") {
        parent[key] = [{}];
        for (let j = 0; j < ele.length; j++) {
          walk(ele[j], parent[key][0]);
        }
      } else {
        parent[key] = ele;
      }
    }
  }

  // 根节点可能是对象或者数组
  if (toString.call(input) === "[object Object]") {
    walk(input, ret);
  } else if (toString.call(input) === "[object Array]") {
    ret = [{}];
    for (let j = 0; j < input.length; j++) {
      walk(input[j], ret[0]);
    }
  }

  return ret;
}
