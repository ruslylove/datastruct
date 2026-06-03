# Build TikZ/LaTeX figures into the PNGs used by the slides.
#
#   make            # build any PNGs whose .tex source is newer
#   make all        # same as above
#   make force      # rebuild every figure unconditionally
#   make clean      # remove LaTeX build artifacts (keeps the PNGs)
#
# Each <name>.tex is compiled to a 300 DPI, tightly-cropped PNG.
# Figures referenced by the slides as ./img/<name>.png land in ../ ;
# figures referenced from the site root as /<name>.png land in ../../../public/ .
# Requires: pdflatex, pdfcrop, pdftoppm (poppler).

DPI     := 300
MARGINS := 4

# Figures used as ./img/<name>.png  (destination: lectures/img/)
IMG_NAMES    := tree_preorder tree_postorder tree_inorder
# Figures used as /<name>.png       (destination: public/)
PUBLIC_NAMES := euler_tour linked_binary_tree linked_binary_tree_1

IMG_PNGS    := $(patsubst %,../%.png,$(IMG_NAMES))
PUBLIC_PNGS := $(patsubst %,../../../public/%.png,$(PUBLIC_NAMES))

.PHONY: all force clean
all: $(IMG_PNGS) $(PUBLIC_PNGS)

force:
	$(MAKE) clean
	rm -f $(IMG_PNGS) $(PUBLIC_PNGS)
	$(MAKE) all

# Canned recipe: compile $< (a .tex) into $@ (the target PNG).
define BUILD_PNG
	pdflatex -interaction=nonstopmode -halt-on-error $<
	pdfcrop --margins $(MARGINS) $*.pdf $*-crop.pdf
	pdftoppm -png -r $(DPI) -singlefile $*-crop.pdf $*
	mv -f $*.png $@
	rm -f $*.pdf $*-crop.pdf $*.aux $*.log
endef

../%.png: %.tex
	$(BUILD_PNG)

../../../public/%.png: %.tex
	$(BUILD_PNG)

clean:
	rm -f *.aux *.log *.pdf *-crop.pdf *-1.png
