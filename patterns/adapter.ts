namespace Patterns {
  interface LegacyPrinter {
    printf(str: string): void;
  }

  interface Printer {
    print(str: string): void;
  }

  class LegacyPrinterImpl implements LegacyPrinter {
    printf(str: string): void {
      console.log("Legacy print", str);
    }
  }

  class PrinterImpl implements Printer {
    print(str: string): void {
      console.log("New print", str);
    }
  }

  class LegacyPrinterAdapter implements LegacyPrinter {
    constructor(private printer: Printer) {}
    printf(str: string): void {
      this.printer.print(str);
    }
  }

  function print(printer: LegacyPrinter) {
    printer.printf("Hello");
  }

  (() => {
    const printer = new PrinterImpl();
    const printerAdapter = new LegacyPrinterAdapter(printer);
    print(printerAdapter);
  })();
}
