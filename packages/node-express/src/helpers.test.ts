import { expect } from "chai";
import { expressPath, fuc, includes, concatIfNotEmpty, toZod } from "./helpers";

describe("helpers", () => {
  describe("fuc", () => {
    it("should return first uppercase", () => {
      const result = fuc("abc");
      expect(result).to.equal("Abc");
    });
  });

  describe("includes", () => {
    it("should return true if item is in array", () => {
      const result = includes([1, 2, 3], 2);
      expect(result).to.equal(true);
    });
    it("should return false if item is not in array", () => {
      const result = includes([1, 2, 3], 4);
      expect(result).to.equal(false);
    });
  });

  describe("expressPath", () => {
    it("should replace /{idXyZ} with :idXyZ", () => {
      const result = expressPath("/api/{idXyZ}");
      expect(result).to.equal("/api/:idXyZ");
    });
    it("should replace /{id}/ with :id/", () => {
      const result = expressPath("/api/{id}/");
      expect(result).to.equal("/api/:id/");
    });
    it("should not replace /{id with /:id", () => {
      const result = expressPath("/{id");
      expect(result).to.equal("/{id");
    });
  });

  describe("toZod", () => {
    it("should remove key example and description recusively", () => {
      const result = toZod({
        type: "object",
        properties: {
          example: "example",
          description: "description",
          properties: {
            example: "example",
            description: "description",
          },
        },
      });
      expect(result).to.deep.equal(
        `z.object({"example":z.any().optional(),"description":z.any().optional(),"properties":z.any().optional()})`
      );
    });
    it("should convert string to zod", () => {
      const result = toZod({
        type: "string",
      });
      expect(result).to.deep.equal("z.string()");
    });
  });

  describe("concatIfNotEmpty", () => {
    it("should concat item if not empty", () => {
      const arr = [1, 2, 3];
      const new_arr = concatIfNotEmpty(arr, 4);
      expect(new_arr).to.contain(4);
    });
    it("should not concat item if empty", () => {
      const arr: number[] = [];
      const new_arr = concatIfNotEmpty(arr, 4);
      expect(new_arr).to.not.contain(4);
    });
  });
});
