import { SetConverter } from "./SetConverter";

describe("SetConverter", () => {
  test("stringfy", () => {
    const s = new Set();
    s.add("test1")
    s.add("test2")

    const str = SetConverter.stringify(s);
    // console.log(str);
    expect(str).toEqual('{"dataType":"Set","value":["test1","test2"]}')
  })

  test("parse", () => {
    const str = '{"dataType":"Set","value":["test1","test2"]}';

    const set = SetConverter.parse(str);
    
    expect(set.has("test1")).toBeTruthy();
  })
})