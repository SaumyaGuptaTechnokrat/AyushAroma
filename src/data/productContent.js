// Editorial category copy describes the existing catalogue, not a universal grade or process.
import approvedProductContent from "./approvedProductContent.json";
// No subcategories are present in the supplied catalogue; add only approved records.
export const categoryContent = [
  {
    summary:
      "Menthol, mint oils and related aromatic ingredients for specification-led bulk sourcing.",
    overview:
      "Explore menthol crystals, Mentha arvensis oil, dementholised peppermint oil, spearmint essential oil and related ingredients in our mint collection. The range brings oils and individual aromatic materials together so procurement teams can compare catalogue references before requesting a quotation.",
    sourcing:
      "Tell us the exact product, required grade, quantity and destination. Botanical source and processing can differ between an oil, a derivative and an isolated ingredient; request product-specific confirmation rather than assuming one extraction method applies to the whole category.",
    materials: "Mint oils, menthol and related aromatic ingredients",
    methods:
      "Confirm distillation, separation or other processing for the selected product.",
    applications: [
      "Formulation enquiries",
      "Fragrance development",
      "Mint ingredient sourcing",
    ],
  },
  {
    summary:
      "A catalogue of aromatic oils for aromatherapy and personal-care sourcing enquiries.",
    overview:
      "Browse lavender, bergamot, lemongrass, vetiver and other oils in the aromatherapy collection. Each listing has its own product reference and enquiry path, helping buyers discuss an individual ingredient instead of ordering against a broad category name.",
    sourcing:
      "The plant species, plant part and extraction method are important purchasing details. Ask for the identity and documentation of your chosen oil, then assess its suitability for your intended formulation. This collection does not imply a medical benefit or a universal grade.",
    materials: "Aromatic oils listed by their existing catalogue names",
    methods: "Product-specific extraction details are available by enquiry.",
    applications: [
      "Aromatherapy product development",
      "Personal-care formulation enquiries",
    ],
  },
  {
    summary:
      "Explore botanical oils and aromatic ingredients for your next formulation.",
    overview:
      "Our essential oil collection includes ambrette seed, basil, eucalyptus, cedarwood, jasmine and other botanical ingredients. Browse by product name or search the collection to find the catalogue reference for your enquiry. The selection covers different plant materials, so source identity and production method should be reviewed for the individual oil.",
    sourcing:
      "Where a botanical reference is provided, it describes the ingredient in general and is kept separate from supplier or batch specifications. Send your required grade, application and destination to request current product information, quantities and supply terms.",
    materials: "Flower, leaf, seed, wood and other botanical oil entries",
    methods:
      "Distillation or extraction must be confirmed for each selected ingredient.",
    applications: [
      "Fragrance development",
      "Cosmetic formulation enquiries",
      "Aromatic ingredient sourcing",
    ],
  },
  {
    summary:
      "Carrier oils for buyers comparing base ingredients and formulation requirements.",
    overview:
      "Explore almond, avocado, grapeseed, jojoba and other oils in the carrier collection. Search individual product names, compare catalogue references and contact our team with the oil and quantity your business needs.",
    sourcing:
      "The source material, processing, refining and intended application can affect your purchasing specification. Please request the product-specific details you need; cold pressing, unrefined status, country of origin and shelf life are not assumed for every item. Include any packaging, storage or documentation requirements when asking for a quotation.",
    materials: "Seed, kernel and other carrier oil entries from the catalogue",
    methods:
      "Confirm pressing, extraction and refining status for your selected oil.",
    applications: [
      "Base ingredient sourcing",
      "Personal-care formulation enquiries",
    ],
  },
  {
    summary:
      "Spice oils and oleoresin entries for ingredient-specific business enquiries.",
    overview:
      "Explore the spice oil and oleoresin collection by product name and catalogue reference. Oils and extracts may have different identities and processing requirements, so each enquiry should name the exact material rather than rely on the category alone.",
    sourcing:
      "Share the intended application, quantity, destination and any required specification. Request confirmation of extraction method, solvent information where relevant, and documentation before making a purchasing decision. Food or flavour use should be confirmed for the specific product and grade, rather than inferred from its name.",
    materials: "Spice oil and oleoresin entries in the supplied catalogue",
    methods:
      "Confirm the extraction method and any relevant residual-solvent requirements.",
    applications: [
      "Spice ingredient sourcing",
      "Flavour formulation enquiries, subject to grade confirmation",
    ],
  },
  {
    summary:
      "Pine oils and derivatives for specification-led industrial sourcing.",
    overview:
      "Browse the pine oil and derivative entries in our existing catalogue. Use the individual product reference when contacting our team so the required material, quantity and delivery destination can be discussed clearly.",
    sourcing:
      "A category name does not define an individual material's composition, process or suitability. Please include any concentration, application, safety-data or packaging requirements with your enquiry. Current technical details, minimum quantities and supply terms need to be confirmed for the selected product before an order is placed.",
    materials: "Pine oil and derivative entries from the catalogue",
    methods:
      "Production and processing details depend on the specific material.",
    applications: [
      "Industrial formulation enquiries",
      "Pine-derived ingredient sourcing",
    ],
  },
];

// General botanical references are not supplier specifications or proof of origin/grade.
// Every other product retains the same structured null fields below until approved.
const references = {
  "Ambrette Seed Oil": {
    botanicalName: "Abelmoschus moschatus Medik.",
    family: "Malvaceae",
    plantPart: "Seeds",
    overview:
      "Ambrette seed oil is an aromatic ingredient associated with the musk-scented seeds of Abelmoschus moschatus. Use the botanical reference to frame your enquiry, then confirm the supplied material and its specification with our team.",
    extraction:
      "Published botanical literature describes steam distillation of ambrette seeds. This is general ingredient information; the extraction and processing of the offered material must be confirmed.",
    origin:
      "Kew records the species as native to tropical and subtropical Asia. This botanical range does not establish the origin of a supplied batch.",
    sources: [
      {
        label: "Kew Science: Abelmoschus moschatus",
        url: "https://powo.science.kew.org/taxon/558023-1",
      },
      {
        label: "PROSEA: Abelmoschus moschatus",
        url: "https://prosea.prota4u.org/view.aspx?id=76",
      },
    ],
  },
  "Lavender Oil": {
    botanicalName: "Lavandula angustifolia Mill.",
    plantPart: "Flowering tops",
    overview:
      "The EMA botanical reference describes lavender oil from Lavandula angustifolia. Confirm the botanical identity of the supplied oil, its specification and the requirements of your formulation before ordering.",
    extraction:
      "The reference describes steam passing through the flowering tops to obtain the oil. Confirm the actual process and identity of the offered product.",
    sources: [
      {
        label: "European Medicines Agency: lavender oil",
        url: "https://www.ema.europa.eu/en/medicines/herbal/lavandulae-aetheroleum",
      },
    ],
  },
  "Eucalyptus Essential Oil (Globulus)": {
    botanicalName: "Eucalyptus globulus Labill.",
    plantPart: "Leaves or terminal branchlets",
    overview:
      "Eucalyptus globulus is one of the botanical sources described in the EMA reference for eucalyptus oil. Request the identity, composition requirements and current product specification for the material offered.",
    extraction:
      "The reference describes steam distillation and rectification for eucalyptus oil. This background does not confirm the processing or grade of a supplied batch.",
    sources: [
      {
        label: "European Medicines Agency: eucalyptus oil",
        url: "https://www.ema.europa.eu/en/medicines/herbal/eucalypti-aetheroleum",
      },
    ],
  },
};
export const specificationFields = [
  ["botanicalName", "Botanical name"],
  ["cas", "CAS number"],
  ["inci", "INCI name"],
  ["appearance", "Appearance"],
  ["color", "Colour"],
  ["aroma", "Aroma"],
  ["extractionMethod", "Extraction method"],
  ["plantPart", "Plant part used"],
  ["solubility", "Solubility"],
  ["specificGravity", "Specific gravity"],
  ["refractiveIndex", "Refractive index"],
  ["storage", "Storage recommendations"],
  ["shelfLife", "Shelf life"],
];
export function createProductContent(product) {
  const defaults = {
    shortDescription: null,
    overview: null,
    botanicalSource: null,
    manufacturing: null,
    origin: null,
    cultivation: null,
    seasonality: null,
    applications: [],
    gallery: [],
    specifications: Object.fromEntries(
      specificationFields.map(([field]) => [field, null]),
    ),
    packaging: { options: [], minimumOrder: null, supplyDetails: null },
    documents: [],
    faqs: [],
    reference: references[product.title] || null,
  };
  const approved = approvedProductContent[product.num] || {};
  return {
    ...defaults,
    ...approved,
    specifications: { ...defaults.specifications, ...approved.specifications },
    packaging: { ...defaults.packaging, ...approved.packaging },
  };
}
