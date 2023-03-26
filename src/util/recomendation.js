var vntk = require("vntk");
var tokenizer = vntk.wordTokenizer();

// Sample articles
// const articles = [
//   {
//     id: 1,
//     title: "Cẩm Nang Du Lịch Ngắm Mùa Hoa Anh Đào Ở Nhật Bản",
//     text: `Không phải ngẫu nhiên mà cứ mỗi dịp xuân về, du khách địa phương và quốc tế đều háo hức tìm đến Nhật Bản để thưởng thức vẻ đẹp của hoa anh đào bung nở. Vào cuối mùa xuân, khắp nơi tại quốc gia này được bao phủ rợp trời bởi sắc hồng của loài hoa mong manh nhưng tuyệt đẹp này. Chính vì thế, người ta còn gọi Nhật Bản là xứ sở hoa anh đào. Nó tượng trưng cho sự hòa bình nhưng không kém phần mạnh mẽ như đức tính của người dân nơi đây.
// Có đến hơn 200 loài hoa anh đào khác nhau đã được tìm thấy tại Nhật Bản, từ những loài mọc hoang trên núi đến những loài hoa được chăm sóc tỉ mỉ. Mỗi loài hoa lại mang một màu sắc và nét đặc trưng khác nhau. Nếu bạn muốn thưởng ngoạn vẻ đẹp của hoa anh đào vào độ đẹp nhất, đừng bỏ qua lịch nở hoa năm 2023 và danh sách những địa điểm lý tưởng nhất để ngắm hoa anh đào dưới đây từ Klook nhé!`,
//   },
//   {
//     id: 2,
//     title: "Kinh Nghiệm Du Lịch Ngắm Hoa Anh Đào Tại Đài Loan",
//     text: `Tuy không phải là một đất nước được mệnh danh là xứ sở hoa anh đào như Nhật Bản nhưng ít ai biết rằng Đài Loan cũng là một nơi tuyệt vời không kém để thưởng thức vẻ đẹp của loài hoa này. Sự khác biệt về các loài hoa cũng như sự khác biệt về văn hóa cũng mang đến những trải nghiệm mới mẻ và thú vị khi ghé thăm Đài Loan mỗi dịp xuân về.
// Hoa anh đào Đài Loan thường nở sớm và kéo dài hơn 1 tháng, nên nếu bạn muốn ngắm hoa anh đào sớm hơn thì có thể chọn Đài Loan làm địa điểm tham dự lễ hội ngắm hoa anh đào nhé! Không chỉ sở hữu những dải hoa anh đào lung linh, bao phủ khắp nơi một màu hồng bạt ngàn mà Đài Loan còn khiến du khách thương nhớ với các món ăn địa phương độc đáo và những kiến trúc cổ kính. Hãy tham khảo kinh nghiệm ngắm hoa anh đào tại Đài Loan ngay dưới đây cùng Klook!`,
//   },
//   {
//     id: 3,
//     title: "Kinh Nghiệm Du Lịch Ngắm Hoa Anh Đào Tại Đài Loan",
//     text: `Singapore vinh dự nằm trong top 10 thành phố được ghé thăm nhiều nhất thế giới trong nhiều năm liền, nơi có vẻ đẹp tổng hòa giữa các nền văn hóa lớn: Malaysia, Ấn Độ, Trung Quốc, Ả Rập, và Anh - tạo thành một thành phố - đất nước Singapore rất riêng.
//   Tuy là quốc gia nhỏ nhất Đông Nam Á, nhưng có tất cả để đáp ứng mọi nhu cầu tham quan của du khách: môi trường xanh – sạch – đẹp, cơ sở hạ tầng hiện đại bậc nhất thế giới, văn hóa đa dạng lâu đời, ẩm thực đặc sắc, hàng loạt các trung tâm mua sắm khổng lồ, cuộc sống về đêm sôi động, hệ thống giao thông công cộng vừa rẻ vừa thuận tiện, và nhiều điều hấp dẫn khác nữa.
//   Cho dù là lần đầu đến Singapore hay đã quay lại nơi này nhiều lần, bạn sẽ vẫn thấy bỡ ngỡ vì sự thay đổi liên tục nhằm đem lại những trải nghiệm mới mẻ nhất cho du khách. Theo đó, Klook cũng cập nhật những kinh nghiệm du lịch Singapore một cách toàn diện để giúp chuyến đi của bạn thêm trọn vẹn.`,
//   },
//   {
//     id: 4,
//     title: "Bangkok Có Gì Chơi? Các Địa Điểm Du Lịch Bangkok Hót Hí",
//     text: ` là thủ đô và cũng là thành phố quan trọng nhất Thái Lan, với dân số hơn 10 triệu người. Nhờ những nỗ lực giới thiệu hình ảnh văn hóa, ẩm thực, lịch sử đầy màu sắc của mình đến với thế giới, Bangkok trở thành một trong những điểm đến có sức hút mạnh mẽ nhất trên bản đồ du lịch châu Á.
//   Đây là điểm khởi đầu cho nhiều chuyến đi khám phá Thái Lan và phần còn lại của Đông Nam Á. Có rất nhiều lý do để đến thăm Bangkok. Tại đây, bạn sẽ tìm thấy khu chợ ngoài trời lớn nhất thế giới, một thủy cung hoàn tráng nằm trong trung tâm mua sắm tám tầng, một bức tượng Phật bằng vàng cao đến 92m và nhiều hơn thế nữa. Bangkok là thành phố của những sự tương phản bất ngờ, vì vậy hãy cùng #teamKlook tận hưởng sự thú vị của nó nhé.`,
//   },
//   {
//     id: 5,
//     title: "Các Địa Điểm Du Lịch Tokyo Hấp Dẫn Cho Chuyến Đi Tự Túc",
//     text: `Các địa điểm du lịch  trong danh sách ngày hôm nay chắc chắn sẽ khiến #teamKlook “đứng ngồi không yên”. Những điểm tham quan trong thành phố khá gần nhau nên không mất nhiều thời gian di chuyển. Sẽ có vô số hoạt động trải nghiệm theo mùa thú vị và ẩm thực bạn nên thử khi đặt chân đến đến Tokyo.
//   Khi nói đến những thành phố thu hút nhất trên thế giới, không thể không nhắc đến Tokyo. Đó là sự kết hợp giữa văn hóa truyền thống sâu sắc và nguồn năng lượng hiện đại. Tokyo - điểm nhấn vàng son của Nhật Bản, một trong những địa điểm hàng đầu đáng để ghé thăm ở châu Á. `,
//   },
//   {
//     id: 6,
//     title: "Cẩm Nang Du Lịch Phuket 4 Ngày 3 Đêm Cho Hội Tự Túc",
//     text: `Nhắc đến Thái Lan, nhiều người thường nghĩ ngay đến Bangkok và Pattaya. Tuy nhiên, còn một điểm đến nổi tiếng khác mà du khách trên khắp thế giới khi đến Thái Lan đều không thể bỏ qua, đó chính là Phuket. Lên kế hoạch du lịch Phuket 4 ngày 3 đêm ngay để tận hưởng trọn vẹn “thiên đường nghỉ dưỡng Châu Á” nhé!
//   Nằm ở phía Nam của ,  là một hòn đảo xinh đẹp với bãi biển xanh, cát trắng và khí hậu trong lành, cùng với vô số những món ăn đường phố cực hấp dẫn. Thực sự nơi này rất xứng đáng để #teamKlook mình cùng nhau khám phá đó nha! Trong bài viết lần này Klook sẽ giới thiệu đến bạn những hoạt động thú vị như tham quan các địa danh nổi tiếng, lặn biển, thưởng thức ẩm thực đặc sắc và mua sắm những sản phẩm độc đáo của địa phương. Hãy cùng khám phá những trải nghiệm tuyệt vời nhất tại Phuket và “chốt đơn” du lịch Phuket 4 ngày 3 đêm thôi.`,
//   },
// ];

const articles = [
  { id: 1, text: "Cẩm Nang Du Lịch Ngắm Mùa Hoa Anh Đào Ở Nhật Bản" },
  { id: 2, text: "Kinh Nghiệm Du Lịch Ngắm Hoa Anh Đào Tại Đài Loan" },
  { id: 3, text: "Bangkok Có Gì Chơi? Các Địa Điểm Du Lịch Bangkok Hót Hí" },
  { id: 4, text: "Các Địa Điểm Du Lịch Tokyo Hấp Dẫn Cho Chuyến Đi Tự Túc" },
  { id: 5, text: "Cẩm Nang Du Lịch Phuket 4 Ngày 3 Đêm Cho Hội Tự Túc" },
];

// Tokenize a document into an array of words
function tokenize(document) {
  return tokenizer.tag(document);
}

// Calculate the term frequency (TF) of a term in a document
function calculateTF(term, document) {
  const tokens = tokenize(document);
  const count = tokens.filter((token) => token === term).length;
  return count / tokens.length;
}

// Calculate the inverse document frequency (IDF) of a term in a collection of documents
function calculateIDF(term, documents) {
  const count = documents.filter((document) =>
    tokenize(document.text).includes(term)
  ).length;
  return Math.log(documents.length / count);
}

// Calculate the TF-IDF weight of a term in a document
function calculateTFIDF(term, document, documents) {
  return calculateTF(term, document) * calculateIDF(term, documents);
}

// Calculate the cosine similarity between two documents
function calculateCosineSimilarity(document1, document2, documents) {
  const tokens1 = tokenize(document1.text);
  const tokens2 = tokenize(document2.text);
  const uniqueTokens = new Set([...tokens1, ...tokens2]);
  const vector1 = [];
  const vector2 = [];
  for (const token of uniqueTokens) {
    vector1.push(calculateTFIDF(token, document1.text, documents));
    vector2.push(calculateTFIDF(token, document2.text, documents));
  }
  let dotProduct = 0;
  for (let i = 0; i < vector1.length; i++) {
    dotProduct += vector1[i] * vector2[i];
  }
  const magnitude1 = Math.sqrt(vector1.reduce((sum, x) => sum + x * x, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((sum, x) => sum + x * x, 0));
  return dotProduct / (magnitude1 * magnitude2);
}

// Generate a matrix of similarity scores for all pairs of documents
function generateSimilarityMatrix(documents) {
  const similarityMatrix = [];
  for (let i = 0; i < documents.length; i++) {
    similarityMatrix[i] = [];
    for (let j = 0; j < documents.length; j++) {
      similarityMatrix[i][j] = calculateCosineSimilarity(
        documents[i],
        documents[j],
        documents
      );
    }
  }
  return similarityMatrix;
}

// Get the top n recommendations for a given document
function getTopRecommendations(document, documents, n) {
  const matrix = generateSimilarityMatrix(documents);
  console.log({ matrix });
  const similarityScores = matrix[document.id - 1];
  console.log({ similarityScores });
  const sortedIndices = similarityScores
    .map((score, index) => [score, index])
    .sort(([score1], [score2]) => score2 - score1)
    .map(([_, index]) => index);
  return sortedIndices.slice(1, n + 1).map((index) => documents[index]);
}

// Example usage
const recommendations = getTopRecommendations(articles[3], articles, 2);
console.log({ recommendations });

module.exports = {
  getTopRecommendations,
};
