namespace Patterns {
  interface MyFile {
    lines: number;
  }

  abstract class BaseProcessor {
    abstract process(file: MyFile): void;
  }

  class TextProcessor extends BaseProcessor {
    process(file: MyFile): void {
      console.log(`Process txt file...\nFile has ${file.lines} lines.\n`);
    }
  }

  class HtmlProcessor extends BaseProcessor {
    process(file: MyFile): void {
      console.log(`Process html file...\nFile has ${file.lines} lines.\n`);
    }
  }

  abstract class FileProcessor {
    processFile(fileName: string) {
      const [_, extension] = fileName.match(/\.(\w+$)/) ?? [];
      const baseProcessor = this.createBaseProcessor(extension);
      const file = { lines: Math.floor(Math.random() * 100) }; // Pretend we have read the file;
      baseProcessor.process(file);
    }

    protected abstract createBaseProcessor(extension: string): BaseProcessor;
  }

  class MyFileProcessor extends FileProcessor {
    createBaseProcessor(extension: string): BaseProcessor {
      switch (extension) {
        case "txt":
          return new TextProcessor();
        case "html":
          return new HtmlProcessor();
        default:
          throw new Error(`Cannot process ${extension} files`);
      }
    }
  }

  (function main() {
    const fileProcessor = new MyFileProcessor();
    fileProcessor.processFile("file.txt");
    fileProcessor.processFile("file.html");
    fileProcessor.processFile("file.zip");
  })();
}
