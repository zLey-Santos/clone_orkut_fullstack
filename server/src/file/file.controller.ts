import { Controller, Get, Param, QueryParam, HeaderParam } from "routing-controllers";
import { FileService } from "./file.service";

@Controller("/file")
export class FileController {
  constructor() {
    this.fileService = new FileService();
  }

  fileService: FileService;

  @Get("/:path")
  async getFile(@Param("path") path: string, @QueryParam("width") width: number, @QueryParam("height") height: number) {
    const file = await this.fileService.getFile(path, width, height);
    return file;
  }
}
