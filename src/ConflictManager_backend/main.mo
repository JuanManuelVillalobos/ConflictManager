import Blob "mo:base/Blob";
import Trie "mo:base/Trie";

// Define a data structure for the file storage (mapping from ID to file)
actor FileStore {
  // Store files using a mapping of ID to Blob (binary data)
  var files: Trie.Trie<Blob.Blob> = Trie.empty();

  // Upload a file: stores the binary data of the file (as Blob)
  public func uploadFile(fileId: Text, fileData: Blob.Blob) : async Text {
    files := Trie.put(files, fileId, fileData);
    return "File uploaded successfully!";
  }

  // Retrieve a file by its ID
  public func getFile(fileId: Text) : async ?Blob.Blob {
    switch Trie.get(files, fileId) {
      case (?fileData) return ?fileData;
      case (_) return null;
    };
  }
};