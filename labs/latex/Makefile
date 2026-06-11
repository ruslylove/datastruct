TEX     := pdflatex
TEXOPTS := -interaction=nonstopmode -halt-on-error
SRC     := $(wildcard lab*.tex)
PDF     := $(SRC:.tex=.pdf)

.PHONY: all clean distclean

all: $(PDF)

%.pdf: %.tex common.tex
	$(TEX) $(TEXOPTS) $<
	$(TEX) $(TEXOPTS) $<

clean:
	rm -f *.aux *.log *.out *.toc *.fls *.fdb_latexmk *.synctex.gz

distclean: clean
	rm -f $(PDF)
